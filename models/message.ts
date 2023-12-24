import { Schema, model } from 'mongoose';

interface Message {
  text: string;
  user: string;
  added: Date;
}

const MessageSchema = new Schema<Message>({
  text: {
    type: String,
    minlength: 2,
    maxlength: 3000,
    required: true,
  },
  user: {
    type: String,
    minlength: 2,
    maxlength: 24,
    required: true,
    trim: true,
  },
  added: {
    type: Date,
    default: Date.now,
  },
});

const Message = model('Message', MessageSchema);
export default Message;
export type { Message };
