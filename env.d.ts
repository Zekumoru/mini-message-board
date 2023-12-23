declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOSTNAME: string;
      HOST: string;
      PORT: string;
      NODE_ENV: 'development' | 'production';
      DB_CONNECTION_STRING: string;
      PERSONAL_IP: string;
      DEV_NAME: string;
    }
  }
}

export {};
