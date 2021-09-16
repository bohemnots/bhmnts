process.env.NTBA_FIX_319 = "1";

import TelegramBot from "node-telegram-bot-api";

import { HOST_URL, S3, TELEGRAM } from "../config";
import * as config from "../config";
import { getCheckout } from "../mongo";

const bot = new TelegramBot(config.TELEGRAM.TOKEN || "", {});

export const newRequest = async (checkout, host?: string) => {
  try {
    const imgUrl = `https://${S3.ENDPOINT}/${S3.BUCKET}/checkouts/${checkout._id}/photo.jpg`;
    const out = await bot.sendPhoto(TELEGRAM.CHAT_ID, imgUrl);
    await bot.editMessageCaption(
      [
        `New purchase request from `,
        `${checkout.name} ${checkout.surname}`,
        `${checkout.email}`,
        `${host || HOST_URL}/checkouts/${checkout._id}/review`,
      ].join("\n"),
      {
        chat_id: TELEGRAM.CHAT_ID,
        message_id: out.message_id,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const failedAfterApprove = async (
  checkout,
  details: any,
  host?: string
) => {
  try {
    await bot.sendMessage(
      TELEGRAM.CHAT_ID,
      [
        `Payment failed for this checkout`,
        `${checkout.name} ${checkout.surname}`,
        `${checkout.email}`,
        `\`${checkout._id}\``,
        `${host || HOST_URL}/checkouts/${checkout._id}/review`,
        `${JSON.stringify(details, null, 2)}`,
      ].join("\n"),
      {
        disable_web_page_preview: true,
        disable_notification: !config.IS_PROD,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const ameriaResponse = async (checkout, response) => {
  try {
    await bot.sendMessage(
      TELEGRAM.CHAT_ID,
      [
        `Ameria Response`,
        `Checkout ID: ${checkout.id || checkout._id}`,
        `Checkout Email: ${checkout.email}`,
        `\`${JSON.stringify(response)}\``,
      ].join("\n"),
      {
        disable_web_page_preview: true,
        disable_notification: !config.IS_PROD,
      }
    );
  } catch (err) {
    console.error(err);
  }
};
