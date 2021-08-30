import { Client } from "@ameria/vpos-sdk";

import {
  AMERIA_CLIENT_ID,
  AMERIA_IS_TEST,
  AMERIA_PW,
  AMERIA_UN,
} from "../config";

export const AmeriaClient = new Client({
  clientId: AMERIA_CLIENT_ID!,
  username: AMERIA_UN!,
  password: AMERIA_PW!,
  isTest: !!AMERIA_IS_TEST,
});
