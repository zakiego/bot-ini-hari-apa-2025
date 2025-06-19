import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config'; 

type TwitterCredentials = {
  appKey: string;
  appSecret: string;
  accessToken: string;
  accessSecret: string;
};


const credentials: TwitterCredentials = {
  appKey: process.env.TWITTER_API_KEY || '',
  appSecret: process.env.TWITTER_API_KEY_SECRET || '',
  accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
};

if (Object.values(credentials).some(value => !value)) {
  console.error(`Error: ${Object.keys(credentials).filter(key => !credentials[key as keyof TwitterCredentials]).join(', ')} is not set`);
  process.exit(1);
}

const twitterClient = new TwitterApi(credentials);

export const rwClient = twitterClient.readWrite;
