import { Request } from 'express';

interface BodyRequest {
  text: string;
  user: string;
}

interface NewLocals extends BodyRequest {
  title: string;
  errorMessage: string;
}

declare module 'express-serve-static-core' {
  interface Locals extends NewLocals {}
}

type NewRequest = Request<{}, {}, BodyRequest>;

export type { NewLocals, NewRequest };
