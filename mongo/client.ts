import { Collection, MongoClient } from "mongodb";
import path from "path";

import { MONGODB_URI } from "../config";

export const dbName = path.basename(MONGODB_URI);

export const client = new MongoClient(MONGODB_URI, {});

export const checkoutCollection = client.db(dbName).collection("checkouts");
export const metadataCollection = client.db(dbName).collection("metadata");
export const settingsCollection = client.db(dbName).collection("settings");

let connection: MongoClient | null = null;

export const connect = async () => {
  if (connection) {
    return connection;
  }
  connection = await client.connect();
};

type Model = {
  connection: MongoClient;
  checkout: Collection<Document>;
  metadata: Collection<Document>;
  settings: Collection<Document>;
};

type HandlerFn = (_model: Model) => Promise<void>;

export const withConnection = async (fn: HandlerFn) => {
  const connection = await client.connect();
  try {
    await fn({
      connection,
      checkout: client.db(dbName).collection("checkouts"),
      metadata: client.db(dbName).collection("metadata"),
      settings: client.db(dbName).collection("settings"),
    });
  } finally {
    await connection?.close();
  }
};
