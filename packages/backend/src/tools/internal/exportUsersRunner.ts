import { connectToDB } from "../../db";

import path from "path";
import dotenv from "dotenv";
import { exportUserBatches } from "../../internal-migration/users";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

connectToDB()
  .then(exportUserBatches)
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
