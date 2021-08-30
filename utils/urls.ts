import { HOST_URL } from "../config";

export const getTicketUrl = (checkoutId: string) => {
  return `${HOST_URL}/checkouts/${checkoutId}/ticket.png`;
};

export const getCheckoutUrl = (checkoutId: string) => {
  return `${HOST_URL}/checkouts/${checkoutId}`;
};
