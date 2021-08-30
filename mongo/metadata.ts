import { settingsCollection } from "./client";
const systemId = "system";
const metadataId = "metadata";

let last: any = null;

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

  last = null;

  return getMetadata();
}

export const getMetadata = async () => {
  if (last) return last;
  last = await settingsCollection.findOne({ _id: metadataId });
  return last;
};

export const fromInfo = (tracks) => {
  let trackName = null;
  if (tracks && tracks.current && tracks.current.name) {
    trackName = tracks.current.name;
  }

  const lastTrack = last && last.trackName;
  if (lastTrack !== trackName) {
    const update = { trackName };

    updateMetadata(update)
      .then(() => console.log(`updated track name to "${trackName}"`))
      .catch((err) => console.error(`failed to set name: ${err.message}`));
  }
};

export const checkPassword = async (password) => {
  const system = await settingsCollection.findOne({ _id: systemId });

  if (system && system.password) {
    if (password !== system.password) {
      throw Error("invalid password");
    }
  }
};
