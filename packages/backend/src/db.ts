import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export async function connectToDB() {
  const { MONGO_DB_URL } = process.env;

  let mongoUrl = MONGO_DB_URL || "";

  if (process.env.NODE_ENV !== "production") {
    mongoUrl =
      "mongodb://root:password@localhost:27019/speedtyper?authSource=admin";
  }

  if (!mongoUrl) {
    throw new Error("No MongoDB url provided");
  }

  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}
