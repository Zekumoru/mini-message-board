import { Schema, model } from 'mongoose';

interface Message {
  text: string;
  user: string;
  added: Date;
}

const MessageSchema = new Schema<Message>({
  text: String,
  user: String,
  added: {
    type: Date,
    default: Date.now,
  },
});

const Message = model('Message', MessageSchema);
export default Message;
export type { Message };
