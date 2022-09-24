import mongoose from "mongoose";

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  await mongoose.connect(process.env.MONGO_DB_URL ?? "");
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const col of collections) {
    // Make sure we do not try to drop system.version
    // But we drop all othher collections
    if (col.collectionName != "system.version") {
      await col.drop();
    }
  }
});

afterAll(async () => {
  // put your client disconnection code here, example with mongodb:
  await mongoose.disconnect();
});
