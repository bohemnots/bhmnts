import SendGrid from "@sendgrid/mail";

import * as config from "../config";
import { getTicketUrl } from "./urls";

if (config.SENDGRID_SECRET) {
  SendGrid.setApiKey(config.SENDGRID_SECRET);
}

const DENY_ID = "d-33026eebeee546f0b442194a5ab470c7";
const APPROVE_ID = "d-a1ecd6ed7f184b3a83dbab0bbb3ff32a";

export const sendDeny = async (email: string, notes: string) => {
  await SendGrid.send({
    from: "bohemnotsradio@gmail.com",
    to: email,
    templateId: DENY_ID,
    dynamicTemplateData: {
      notes,
    },
  });
};

export const sendApprove = (
  email: string,
  checkoutId: string,
  notes: String
) => {
  const qrCodeUrl = getTicketUrl(checkoutId);
  return SendGrid.send({
    from: "bohemnotsradio@gmail.com",
    to: email,
    templateId: APPROVE_ID,
    dynamicTemplateData: {
      qrCodeUrl,
      notes,
    },
  });
};
