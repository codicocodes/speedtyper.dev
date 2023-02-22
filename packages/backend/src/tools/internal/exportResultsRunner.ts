import { exportResultBatches } from "../../internal-migration/results";
import { connectToDB } from "../../db";

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

connectToDB()
  .then(exportResultBatches)
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
