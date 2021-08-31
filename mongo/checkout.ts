import {
  IInitPaymentResponse,
  IPaymentDetailsResponse,
} from "@ameria/vpos-sdk";
import { ObjectId } from "mongodb";

import { checkoutCollection } from "./client";

export const getCheckout = async (id: string): Promise<ICheckout> => {
  const doc = await checkoutCollection.findOne({ _id: new ObjectId(id) });
  return doc as ICheckout;
};

export const createCheckout = async (data): Promise<ICheckout> => {
  const checkout = await checkoutCollection.insertOne({
    name: data.name,
    surname: data.surname,
    email: data.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const id = new ObjectId(checkout.insertedId).toString();
  return getCheckout(id);
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
  name?: string;
  surname?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  init?: IInitPaymentResponse;
  details?: IPaymentDetailsResponse;
}
