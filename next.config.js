const { config } = require("dotenv");
const { resolve } = require("path");

const envPath = resolve(`./.env.local`);
const env = config({ path: envPath }).parsed;

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    IS_PROD: env.NODE_ENV === "production",

    MONGODB_URI: env.MONGODB_URI,
    AMERIA_CLIENT_ID: env.AMERIA_CLIENT_ID,
    AMERIA_UN: env.AMERIA_UN,
    AMERIA_PW: env.AMERIA_PW,
    AMERIA_IS_TEST: env.AMERIA_IS_TEST,

    HOST_URL: env.HOST_URL,

    SENDGRID_SECRET: env.SENDGRID_SECRET,

    TELEGRAM: {
      TOKEN: env.TELEGRAM_TOKEN,
      CHAT_ID: env.TELEGRAM_CHAT_ID,
    },

    PASSWORD: env.PASSWORD,

    S3: {
      ACCESS_KEY_ID: env.ACCESS_KEY_ID || "",
      SECRET_ACCESS_KEY: env.SECRET_ACCESS_KEY || "",
      ENDPOINT: env.S3_ENDPOINT || "",
      REGION: env.S3_REGION || "eu-central-1",
      BUCKET: env.BUCKET_NAME || "bohemnots",
    },
  },
  reactStrictMode: true,
};
