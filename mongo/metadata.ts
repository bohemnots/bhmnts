import { settingsCollection } from "./client";
const metadataId = "metadata";

export const nextOrderId = async () => {
  const settings = await settingsCollection.findOneAndUpdate(
    {
      _id: "settings",
    },
    { $inc: { orderId: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  return settings.value?.orderId;
};

export async function updateMetadata(update) {
  await settingsCollection.updateOne(
    { _id: metadataId },
    { $set: update },
    { upsert: true }
  );

  return getMetadata();
}

export const getMetadata = async () =>
  await settingsCollection.findOne({ _id: metadataId });
