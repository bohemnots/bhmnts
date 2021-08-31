import { HOST_URL } from "../config";

export const getTicketUrl = (checkoutId: string) => {
  return `${HOST_URL}/api/tickets/${checkoutId}.png`;
};

export const getCheckoutUrl = (checkoutId: string) => {
  return `${HOST_URL}/checkouts/${checkoutId}`;
};
