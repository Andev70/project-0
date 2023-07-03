import mongoose from 'mongoose';
// reply schema

const replySchema = new mongoose.Schema({
  replyerName: {
    type: String,
    trim: true,
    required: [true, 'name of reply is required'],
  },
  replyerPic: { type: String },
  reply: {
    type: String,
    required: [true, 'need the actual reply'],
    trim: true,
  },
  replyedAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
});

// comment schema for better performence
const commentSchema = new mongoose.Schema({
  post_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: [true, 'post id is required'],
  },
  commenter_name: {
    type: String,
    required: [true, 'your name is not provided'],
    trim: true,
  },
  commenter_pic: {
    type: String,
    default: 'empty',
  },

  comment: { type: String, required: [true, 'comment is empty'] },
  time_stamp: { type: Date, default: Date.now() },
  comment_likes: { type: Number, default: 0 },
  comment_reply: [replySchema],
});

// post schema

const postSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'user reference  is needed'],
  },

  posted_at: {
    type: Date,
    default: Date.now(),
  },

  caption: {
    type: String,
    maxlength: [70, 'caption should be short and sweet '],
    trim: true,
  },
  picture: {
    type: String,
    default: 'empty',
  },
  reactions: {
    type: [
      {
        name: {
          type: String,
        },
        value: {
          type: Number,
        },
      },
    ],
    default: [
      { name: 'likes', value: 0 },
      { name: 'happy', value: 0 },
      { name: 'angry', value: 0 },
      { name: 'sad', value: 0 },
      { name: 'heart', value: 0 },
    ],
  },
  comments: [commentSchema],
  share: { type: Number, default: 0 },
  visivility_status: { type: String, default: 'public' },
  type: { type: String, default: 'photo/text' },
});
// adding index for quering
postSchema.index({ userID: 1 });
// set schemas
export const Post = mongoose.model('posts', postSchema);
export const Comment = mongoose.model('Comment', commentSchema);
