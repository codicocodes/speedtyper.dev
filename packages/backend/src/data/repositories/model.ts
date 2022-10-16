import mongoose, { Document, Types } from "mongoose";

const { Schema } = mongoose;

export interface IRepositoryDoc extends Document {
  _id: Types.ObjectId;
  slug: string;
  htmlUrl: string;
  language: string;
  stars: number;
  licenseName: string;
  ownerAvatar: string;
  defaultBranch: string;
}

const repoSchema = new Schema<IRepositoryDoc>({
  slug: { type: String, required: true, unique: true },
  htmlUrl: { type: String, required: true, unique: true },
  licenseName: { type: String, required: true },
  stars: { type: Number, required: true },
  ownerAvatar: { type: String, required: true },
  language: { type: String, required: true },
  defaultBranch: { type: String, required: true },
});

export const Repository = mongoose.model<IRepositoryDoc>(
  "repositories",
  repoSchema
);
