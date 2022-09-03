import db from "../db";

const { Schema } = db;

const schema = new Schema({
  username: String,
  githubUrl: { type: String, unique: true },
  avatarUrl: String,
  githubId: Number,
  email: { required: false, type: String },
  banned: Boolean,
});

export interface UserDoc extends db.Document {
  username: string;
  githubUrl: string;
  avatarUrl: string;
  githubId: number;
  email?: string;
  banned?: boolean;
}

const model = db.model<UserDoc>("user", schema);

model.syncIndexes();

export default model;
