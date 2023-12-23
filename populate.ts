import 'dotenv/config';
import Message from './models/message';
import mongoose from 'mongoose';

console.log('This script populates the message collection with sample data.');
console.warn(
  'Warning: Re-running this script will/might duplicate the sample data!'
);

mongoose.set('strictQuery', false);
const dbConnectionString = process.env.DB_CONNECTION_STRING;

(async () => {
  console.log('Debug: connecting to db...');
  await mongoose.connect(dbConnectionString);
  console.log('Debug: db connected');
  await createMessages();
  console.log('Debug: data population completed');
  console.log('Debug: closing db connection...');
  await mongoose.connection.close();
  console.log('Debug: db connection successfully closed');
})().catch((error: { message: string }) => {
  console.error(
    `An error occured while trying to populate the message collection: ${error.message}`
  );
});

/**
 * Helper functions
 */

function ellipseString(str: string, max: number) {
  const sub = str.substring(0, max);
  if (str.length <= max) {
    return sub;
  }
  return sub + '...';
}

/**
 * Create documents functions
 */

async function messageCreate(message: Omit<Message, 'added'>) {
  await new Message(message).save();
  console.log(
    `Added message: ${ellipseString(message.user, 10)} ${ellipseString(
      message.text,
      30
    )}`
  );
}

/**
 * Create collections functions
 */

async function createMessages() {
  console.log('Adding sample messages...');
  await Promise.all([
    messageCreate({
      user: 'Zekumoru',
      text: 'Hi! This message has been added through the populate script!',
    }),
    messageCreate({
      user: 'Zekumoru',
      text: 'Another message from the populate script.',
    }),
    messageCreate({
      user: 'Zekumoru',
      text: "Okay, last populate script's message.",
    }),
  ]);
}
