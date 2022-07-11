import {
  IInitPaymentResponse,
  IPaymentDetailsResponse,
} from "@ameria/vpos-sdk";
import { ObjectId } from "mongodb";
import * as Yup from "yup";

import { checkoutCollection } from "./client";

const CheckoutSchema = Yup.object({
  email: Yup.string().required(),
  fullName: Yup.string().required(),
});

export const getCheckout = async (id: string): Promise<ICheckout> => {
  const doc = await checkoutCollection.findOne({ _id: new ObjectId(id) });
  return doc as ICheckout;
};

export const getCheckoutByPaymentID = async (
  id: string
): Promise<ICheckout> => {
  const doc = await checkoutCollection.findOne({
    "init.PaymentID": new RegExp(id, "i"),
  });
  return doc as ICheckout;
};

export const createCheckout = async (data): Promise<ICheckout> => {
  const validData = await CheckoutSchema.validate(data);
  const checkout = await checkoutCollection.insertOne({
    ...validData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const id = new ObjectId(checkout.insertedId).toString();
  return getCheckout(id);
};

export const createApprovedCheckout = async (data): Promise<ICheckout> => {
  const checkout = await createCheckout({
    ...data,
    status: "approved",
    onDoor: true,
  });
  // await sendApprove(checkout.email, checkout._id + "");
  return checkout;
};

export const updateCheckout = async (id, data): Promise<ICheckout> => {
  await checkoutCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } },
    { upsert: true }
  );
  return getCheckout(id);
};

export interface ICheckout {
  _id: ObjectId;
  name: string;
  surname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  status?: string;
  notes?: string;
  init?: IInitPaymentResponse;
  details?: IPaymentDetailsResponse;
}
