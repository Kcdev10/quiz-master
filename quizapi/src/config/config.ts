import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  MOGOURL: process.env.MONGOURL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
};
