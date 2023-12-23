import Message from '../models/message';

interface DevMessage extends Message {
  isDev: boolean;
}

interface IndexLocals {
  title: string;
  messages: DevMessage[];
}

declare module 'express-serve-static-core' {
  interface Locals extends IndexLocals {}
}

export type { IndexLocals, DevMessage };
