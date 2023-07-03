import express from 'express';
import expressFile from 'express-fileupload';
const router = express.Router();
import path from 'path';
import {
  getSingleProfile,
  createProfile,
  getAllProfiles,
} from '../controller/p-control.js';

router
  .route('/')
  .post(
    expressFile({
      debug: true,
      useTempFiles: true,
      tempFileDir: path.join(
        path.dirname(new URL(import.meta.url).pathname),
        '../temp'
      ),
    }),
    createProfile
  )
  .get(getAllProfiles);
router.route('/profile').get(getSingleProfile);
export default router;
