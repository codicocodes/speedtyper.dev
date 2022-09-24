import mongoose, { Document, Types } from "mongoose";

const { Schema } = mongoose;

export interface ITrackedRepoDoc extends Document {
  _id: Types.ObjectId;
  slug: string;
}

const repoSchema = new Schema<ITrackedRepoDoc>({
  slug: { type: String, required: true },
});

export const TrackedRepo = mongoose.model<ITrackedRepoDoc>(
  "tracked-repositories",
  repoSchema
);
