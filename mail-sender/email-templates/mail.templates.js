export const otpTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>OTP Verification Email</title>
    <style>
      /* Global styles */
      body {
        font-family: "Helvetica Neue", sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        background-color: #f5f5f5;
        margin: 0;
        padding: 0;
      }

      /* Header styles */
      header {
        background-color: #1abc9c;
        color: #fff;
        padding: 40px;
        text-align: center;
        margin-bottom: 40px;
      }
      h1 {
        font-size: 32px;
        margin: 0;
        font-weight: 600;
        letter-spacing: -0.5px;
      }

      /* Body styles */
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      p {
        margin: 0 0 20px 0;
        font-size: 18px;
        line-height: 1.5;
      }
      .code {
        font-size: 48px;
        font-weight: 700;
        color: #1abc9c;
        margin-bottom: 20px;
        letter-spacing: -1px;
      }
      .instructions {
        font-size: 22px;
        font-weight: 600;
        color: #333;
        margin-bottom: 40px;
        letter-spacing: -0.5px;
      }
      .btn {
        display: inline-block;
        background-color: #1abc9c;
        color: #fff;
        padding: 16px 32px;
        border-radius: 5px;
        text-decoration: none;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.5px;
        transition: all 0.3s ease;
        margin-top: 20px;
      }
      .btn:hover {
        background-color: #148f77;
      }

      /* Footer styles */
      footer {
        background-color: #333;
        padding: 20px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        letter-spacing: -0.5px;
      }
      footer a {
        color: #fff;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>OTP Verification</h1>
    </header>
    <div class="container">
      <p>Hello,</p>
      <p>
        Thank you for signing up for our service. To verify your account, please
        enter the OTP code that we've provided below:
      </p>
      <p class="code">${otp}</p>
      <p class="instructions">
        Please enter this code on the verification page in order to complete
        your account setup:
      </p>
      <a href="#" class="btn">Verify My Account</a>

      <p>
        If you did not request an OTP code or did not sign up for our service,
        please disregard this email. If you have any questions or concerns,
        please don't hesitate to contact our customer support team at
        support@acmecorp.com.
      </p>
      <p>Thank you,</p>
      <p>The Acme Corporation Team</p>
    </div>
    <footer>
      <p>&copy; 2023 Acme Corporation. All rights reserved.</p>
    </footer>
  </body>
</html>

`;
};
