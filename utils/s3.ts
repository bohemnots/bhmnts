import { S3 } from "@aws-sdk/client-s3";

import * as config from "../config";

export const s3 = new S3({
  credentials: {
    accessKeyId: config.S3.ACCESS_KEY_ID,
    secretAccessKey: config.S3.SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
  region: config.S3.REGION,
  endpoint: "https://fra1.digitaloceanspaces.com",
});
