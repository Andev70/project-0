import express from 'express';
const router = express.Router();
import {
  signup,
  login,
  getUserInfo,
  verifyUser,
  resendVerifyOtp,
  resetPassOtp,
  checkResetPassOtp,
  renewPassword,
} from '../controller/control.js';

// routes are declaire
router.route('/otp/check').post(checkResetPassOtp);
router.route('/signup').post(signup);
router.route('/verify').post(verifyUser);
router.route('/login').post(login);
router.route('/').post(getUserInfo);
router.route('/resendotp').patch(resendVerifyOtp);
router.route('/reset').post(resetPassOtp);
router.route('/new/password').post(renewPassword);
// exports
export default router;
