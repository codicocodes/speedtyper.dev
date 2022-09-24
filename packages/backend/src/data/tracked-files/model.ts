import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITrackedFileDoc extends Document {
  repositoryId: Types.ObjectId;
  path: string;
  currentSha: string;
  currentTreeSha: string;
  syncedSha?: string;
}

const trackedFile = new Schema<ITrackedFileDoc>({
  repositoryId: { type: Schema.Types.ObjectId, required: true },
  path: { type: String, required: true },
  currentSha: { type: String, required: true },
  currentTreeSha: { type: String, required: true },
  syncedSha: { type: String },
});

trackedFile.index({ repository_id: 1, path: 1 }, { unique: true });

export const TrackedFile = mongoose.model<ITrackedFileDoc>(
  "tracked-files",
  trackedFile
);
