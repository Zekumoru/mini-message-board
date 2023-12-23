import Message from '../models/message';

interface IndexLocals {
  title: string;
  messages: Message[];
}

declare module 'express-serve-static-core' {
  interface Locals extends IndexLocals {}
}

export type { IndexLocals };
