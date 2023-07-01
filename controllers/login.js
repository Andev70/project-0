import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

// login handler

const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    // check if empty string

    if (password === "" && email === "") {
      return res.status(401).json({ msg: "credentials empty" });
    } else if (password === "") {
      return res.status(401).json({ msg: "password empty" });
    } else if (email === "") {
      return res.status(401).json({ msg: "email is empty" });
    }

    // find user

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "user not found", status: "failed" });
    }

    const { _id, password: hashedPassword } = user;

    // if not present

    const comparePassword = bcrypt.compareSync(password, hashedPassword);

    if (!comparePassword)
      return res
        .status(401)
        .json({ msg: "incorrect password", status: "failed" });

    // sign jwt token and send it to the user to login

    const JWT_TOKEN = jsonwebtoken.sign(
      { _id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // send the success message

    res
      .status(200)
      .json({ JWT_TOKEN, msg: "successfully logged in", status: "ok" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: ["server error", e] });
  }
};

export default login;
