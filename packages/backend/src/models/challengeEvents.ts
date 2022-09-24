import db from "mongoose";

const { Schema } = db;

const schema = new Schema({
  event: {
    type: String,
    enum: [
      "challenge_started",
      "challenge_skipped",
      "100_characters_typed",
      "challenge_completed",
    ],
  },
  referrer: { type: String, required: false },
  challenge: String,
  time: { type: Date, default: () => new Date() },
});

export default db.model("challengeevent", schema);
