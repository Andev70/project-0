import User from '../model/user-model.js';
import newOTP from 'otp-generators';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../mail-sender/send-mail.js';
import { otpTemplate } from '../mail-sender/email-templates/mail.templates.js';

// sign up

export const signup = async (req, res) => {
  try {
    const userPass = req.body.password;
    const useridentity = req.body.username;
    const usermail = req.body.email;
    const alreadyPresent = await User.findOne({ email: usermail });
    if (alreadyPresent)
      return res.status(500).json({ msg: 'user already present' });
    // check user cred
    if (userPass === '' && useridentity === '' && usermail === '') {
      return res.status(401).json({
        msg: 'provide your username password and email',
      });
    } else if (useridentity === '' && userPass === '') {
      res.status(401).json({ msg: 'provide username and a password' });
    } else if (useridentity === '' && usermail === '') {
      return res.status(401).json({ msg: 'provide your email and name' });
    } else if (userPass === '' && usermail === '') {
      return res
        .status(401)
        .json({ msg: 'provide an email and a strong pasword' });
    } else if (useridentity === '') {
      return res.status(401).json({ msg: 'please enter your name' });
    } else if (userPass === '') {
      return res.status(401).json({ msg: 'please provide a password' });
    } else if (usermail === '') {
      return res.status(401).json({ msg: 'please enter your email' });
    }
    //otp is generated
    const OTP = newOTP.generate(4, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });
    // sending email
    const send_to = usermail;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = usermail;
    const subject = 'Thank You Message From NodeCourse';
    const message = otpTemplate(OTP);

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    // create unverified user
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(userPass, salt);
    req.body.password = hashedPass;
    req.body.otp = OTP;
    const user = await User.create(req.body);
    const mailer = user.email;
    const verifyID = user._id;
    res.status(201).json({
      msg: [
        'your account has been initiated please verify',
        usermail,
        verifyID,
      ],
    });
    // delete after specific time if user is not verified
    const vUser = await User.findOne({ email: mailer });
    if (vUser) {
      setTimeout(async () => {
        const isVerified = await User.findOne({ email: mailer });
        const userVerification = isVerified.verified;

        if (!userVerification) {
          const del = await User.findOneAndDelete({ email: mailer });
        }
      }, 6000000);
    }
    //////////
  } catch (e) {
    res.status(500).json({ msg: e });
    console.log(e);
  }
};
// verify user email
export const verifyUser = async (req, res) => {
  try {
    const userID = req.body.id;
    const clientOTP = req.body.otp;
    const user = await User.findOne({ _id: userID });
    if (!user) return res.status(404).json({ msg: 'no user found' });
    if (user.verified)
      return res.status(401).json({ msg: 'you are already verified' });
    const otpDB = user.otp;
    // if verification is true
    if (clientOTP === otpDB) {
      const userDatabaseID = user._id;
      const userDatabaseEmail = user.email;

      const verifyUser = await User.findOneAndUpdate(
        { _id: userDatabaseID },
        { verified: true }
      );
      // sign jsonwebtoken
      const token = jwt.sign(
        { userDatabaseID, userDatabaseEmail },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      );
      // delete the otp from database after verification
      const delOtp = await User.findOneAndUpdate(
        { _id: userDatabaseID },
        { $unset: { otp: otpDB } }
      );

      return res.status(200).json({ msg: ['successfully verified', token] });
    } else if (clientOTP !== otpDB) {
      return res.status(201).json({ msg: 'incorect otp try again' });
    }
  } catch (e) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};
// resend otp to verify user email
export const resendVerifyOtp = async (req, res) => {
  try {
    // get user info from jsonwebtoken

    const email = req.body.email;
    const userId = req.body.Userid;

    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ msg: 'user not found' });
    // if already verified
    if (user.verified)
      return res.status(201).json({ msg: 'you are already verified' });
    // generate otp to resendVerifyOtp
    const resendOTP = newOTP.generate(4, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { otp: resendOTP }
    );
    if (!updatedUser) return res.status(404).json({ msg: 'cannot resend otp' });
    // sending email
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = 'Thank You Message From NodeCourse';
    const message = otpTemplate(resendOTP);

    await sendEmail(subject, message, send_to, sent_from, reply_to);

    // successfully resend email
    res.status(201).json({ msg: `we have sent a new otp to ${email}` });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ msg: "error occured in the server can't resend otp" });
  }
};
// login
export const login = async (req, res) => {
  try {
    const userPassword = req.body.password;
    const userEmail = req.body.email;
    // if both field empty
    if (
      (userPassword === null || userPassword === '') &&
      (userEmail === null || userEmail === '')
    ) {
      return res.status(500).json({ msg: 'please provide your credentials' });
    }
    // // if user email is empty
    if (userEmail === null || userEmail === '') {
      return res.status(500).json({ msg: 'please provide your email' });
    }
    // // if password is empty
    if (userPassword === null || userPassword === '') {
      return res.status(500).json({ msg: 'please provide your password' });
    }
    const user = await User.findOne({ email: userEmail });
    // // if no user found

    if (!user) {
      return res.status(404).json({ msg: 'no user found, please signup' });
    }
    const hashedPass = user.password;
    const decodedPass = bcrypt.compareSync(userPassword, hashedPass);
    if (!decodedPass) {
      return res.status(401).json({ msg: 'password is inccorect' });
    }
    const verification = user.verified;
    if (!verification) {
      return res.status(401).json({ msg: 'please verify your account' });
    }
    const id = user._id;
    const token = jwt.sign({ id, userEmail }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('token', token, { maxAge: 36000000 });
    res.status(200).json({ msg: ['login successful', id, token] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'error occurred' });
  }
};
// reset otp email send
export const resetPassOtp = async (req, res) => {
  try {
    const emailOfUser = req.body.email;
    const user = await User.findOne({ email: emailOfUser });

    if (!user) {
      return res.status(404).json({ msg: 'no user found' });
    }
    const checkAuth = user.verified;
    if (!checkAuth) {
      return res.status(400).json({
        msg: 'please verify your email or delete your account and register again',
      });
    }
    const OTP = newOTP.generate(4, {
      alphabets: false,
      upperCase: false,
      specialChar: false,
    });

    const updateOtp = await User.findOneAndUpdate(
      { email: emailOfUser },
      { otp: OTP }
    );
    if (!updateOtp) {
      return res.status(500).json({ msg: 'cannot update otp' });
    }
    // send email
    const send_to = emailOfUser;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = emailOfUser;
    const subject = 'Thank You Message From NodeCourse';
    const message = otpTemplate(OTP);

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    const author = jwt.sign({ emailOfUser }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.status(200).json({
      msg: [
        author,
        'otp has been reset please verify the code we have sent to your account',
      ],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'error occured' });
  }
};

// verify reset password otp
export const checkResetPassOtp = async (req, res) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken)
      return res
        .status(401)
        .json({ msg: 'we have not found any auth token to identify you' });
    const verifyUserEmail = jwt.verify(authToken, process.env.JWT_SECRET);
    if (!verifyUserEmail)
      return res.status(401).json({ msg: 'we cannot authenticate you' });
    const userGmail = verifyUserEmail.emailOfUser;
    const userOtp = req.body.otp;
    const user = await User.findOne({ email: userGmail });
    if (!user) return res.status(404).json({ msg: 'no user find' });
    const userDBOtp = user.otp;
    if (userOtp !== userDBOtp) {
      return res.status(401).json({ msg: 'incorect otp' });
    } else if (userOtp === userDBOtp) {
      const tokenForReset = jwt.sign({ userGmail }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      res.status(200).json({
        msg: ['verification successful reset password', tokenForReset],
      });
    }
    const removeOtp = await User.findOneAndUpdate(
      { email: userGmail },
      { $unset: { otp: userDBOtp } }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'error occured' });
  }
};
// reset password
export const renewPassword = async (req, res) => {
  try {
    const authoHeader = req.headers.authorization;
    if (!authoHeader) return res.status(404).json({ msg: 'cannot find user' });
    const jwtCode = jwt.verify(authoHeader, process.env.JWT_SECRET);
    if (!jwtCode) return res.json({ msg: 'cannot auth user' });
    const userMail = jwtCode.userGmail;

    const newPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(newPassword, salt);
    const updatePass = await User.findOneAndUpdate(
      { email: userMail },
      { password: hashedPass }
    );
    if (!updatePass)
      return res.status(500).json({ msg: 'cannot reset password try again' });
    res.status(201).json({ msg: 'password reset successful' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'error occured' });
  }
};
// get user info if authorized

export const getUserInfo = async (req, res) => {
  try {
    const authoHeader = req.headers.authorization;
    if (!authoHeader) {
      return res.status(401).json({ msg: 'please login to get access' });
    }
    const token = authoHeader;
    const authCheck = jwt.verify(token, process.env.JWT_SECRET);
    const userID = authCheck.id;

    const user = await User.findOne({ _id: userID });
    const username = user.username;
    const userId = user._id;

    res.status(200).json({ username, userId });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'error from server' });
  }
};
