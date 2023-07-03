import express from 'express';
import expressFile from 'express-fileupload';
const router = express.Router();
import path from 'path';
import { createPost } from '../controller/post.control.js';

router.route('/').post(
  expressFile({
    debug: true,
    useTempFiles: true,
    tempFileDir: path.join(
      path.dirname(new URL(import.meta.url).pathname),
      '../temp'
    ),
  }),
  createPost
);

export default router;
