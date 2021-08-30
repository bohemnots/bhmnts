const { config } = require("dotenv");
const { resolve } = require("path");

const envPath = resolve(`./.env.local`);
config({ path: envPath });

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    IS_PROD: process.env.NODE_ENV === "production",

    MONGODB_URI: process.env.MONGODB_URI,
    AMERIA_CLIENT_ID: process.env.AMERIA_CLIENT_ID,
    AMERIA_UN: process.env.AMERIA_UN,
    AMERIA_PW: process.env.AMERIA_PW,
    AMERIA_IS_TEST: process.env.AMERIA_IS_TEST,

    HOST_URL: process.env.HOST_URL,

    SENDGRID_SECRET: process.env.SENDGRID_SECRET,

    TELEGRAM: {
      TOKEN: process.env.TELEGRAM_TOKEN,
      CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    },

    PASSWORD: process.env.PASSWORD,

    S3: {
      ACCESS_KEY_ID: process.env.ACCESS_KEY_ID || "",
      SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || "",
      ENDPOINT: process.env.S3_ENDPOINT || "",
      REGION: process.env.S3_REGION || "eu-central-1",
      BUCKET: process.env.BUCKET_NAME || "bohemnots",
    },
  },
  reactStrictMode: true,
};
