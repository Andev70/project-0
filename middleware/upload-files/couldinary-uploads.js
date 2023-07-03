import cloudinary from 'cloudinary';
cloudinary.v2;
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
//import jwt from 'jsonwebtoken';
//////////
export const profilePictureUpload = (request, user, collection, response) => {
  const files = request.files;

  if (files) {
    const profilePicture = Object.values(files)[0];
    cloudinary.uploader.upload(
      profilePicture.tempFilePath,
      {
        folder: 'profile',
      },
      async (err, image) => {
        if (err) {
          fs.unlink(profilePicture.tempFilePath, (error) => {
            console.log(error);
          });
          return response
            .status(401)
            .json({ msg: 'having some issues uploading profile' });
        }
        // if uploaded
        const img = image.url;

        const profileImg = await collection.findOneAndUpdate(
          { userID: user },
          { pic: img }
        );
        fs.unlink(profilePicture.tempFilePath, (error) => {});
        response.status(201).json({ msg: 'profile created with picture' });
      }
    );
  }
};
//////////
