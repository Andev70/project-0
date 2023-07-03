import mongoose from 'mongoose';
// notification schema for incoming notifications
const notificationSchema = new mongoose.Schema({
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
    required: [true, 'sender is not provided'],
  },
  catagory: {
    type: String,
    required: [true, 'catagory of the notification is required'],
    trim: true,
  },
  sentAt: { type: Date, default: Date.now() },
  message: { type: String },
});
// profile schema for every profile
const profileSchema = new mongoose.Schema({
  useremail: { type: String, required: [true, 'need your email'] },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [
      true,
      "user id is not found, whithout user id we can't identify the user",
    ],
    unique: [true, 'user auth faild'],
  },
  username: {
    type: String,
    required: [true, 'please provide a stage name'],
    trim: true,
  },
  pic: {
    type: String,
    default: './upload/IMG-20230207-WA0001.jpg',
  },
  bio: {
    type: String,
    maxlength: [60, 'bio should be short and sweet'],
    trim: true,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profiles' }],
  website: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date().getTime(),
  },
  notifications: [notificationSchema],
});

const pfSchema = mongoose.model('profiles', profileSchema);
export default pfSchema;
