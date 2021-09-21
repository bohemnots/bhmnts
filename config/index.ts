type TEnvType = {
  NODE_ENV: string;
  MONGODB_URI: string;
  AMERIA_CLIENT_ID: string;
  AMERIA_UN: string;
  AMERIA_PW: string;
  AMERIA_IS_TEST: string;
  HOST_URL: string;
  SENDGRID_SECRET: string;
  TELEGRAM_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  PASSWORD: string;
  ACCESS_KEY_ID: string;
  SECRET_ACCESS_KEY: string;
  S3_ENDPOINT: string;
  S3_REGION?: string;
  BUCKET_NAME?: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  CODESPACE_NAME: string;
};

const required = [
  "MONGODB_URI",
  "AMERIA_CLIENT_ID",
  "AMERIA_UN",
  "AMERIA_PW",
  "SENDGRID_SECRET",
  "TELEGRAM_TOKEN",
  "TELEGRAM_CHAT_ID",
  "TELEGRAM_TOKEN",
  "TELEGRAM_CHAT_ID",
  "ACCESS_KEY_ID",
  "SECRET_ACCESS_KEY",
  "S3_ENDPOINT",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Required variables '${key}' is missing`);
  }
}

// @ts-ignore
const env: TEnvType = process.env;
export const NODE_ENV = env.NODE_ENV || "development";

export const IS_PROD = NODE_ENV === "production";

export const MONGODB_URI = env.MONGODB_URI;
export const AMERIA_CLIENT_ID = env.AMERIA_CLIENT_ID;
export const AMERIA_UN = env.AMERIA_UN;
export const AMERIA_PW = env.AMERIA_PW;
export const AMERIA_IS_TEST = env.AMERIA_IS_TEST;

export const HOST_URL =
  env.HOST_URL ||
  (env.CODESPACE_NAME
    ? `https://${env.CODESPACE_NAME}-${process.env.PORT}.githubpreview.dev`
    : "");

export const SENDGRID_SECRET = env.SENDGRID_SECRET;

export const TELEGRAM = {
  TOKEN: env.TELEGRAM_TOKEN,
  CHAT_ID: env.TELEGRAM_CHAT_ID,
};

export const PASSWORD = env.PASSWORD;

export const S3 = {
  ACCESS_KEY_ID: env.ACCESS_KEY_ID || "",
  SECRET_ACCESS_KEY: env.SECRET_ACCESS_KEY || "",
  ENDPOINT: env.S3_ENDPOINT || "",
  REGION: env.S3_REGION || "eu-central-1",
  BUCKET: env.BUCKET_NAME || "bohemnots",
};

export const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
