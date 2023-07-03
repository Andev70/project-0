import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  receiverID: { type: String, required: [true, 'receiver id is required'] },
  senderID: {
    type: String,
    required: [true, 'sender id is required'],
  },
  createdAt: { type: Date, default: Date.now() },
  message: {
    type: Array,
    required: [true, 'without message schema cannot be created'],
  },
});

const msgSchema = mongoose.model('messages', messageSchema);
export default msgSchema;
