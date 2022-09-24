import mongoose, { Document, Types } from "mongoose";

const { Schema } = mongoose;

export interface ICodeChallengeDoc extends Document {
  _id: Types.ObjectId;
  repositoryId: Types.ObjectId;
  content: string;
  filePath: string;
  permaUrl: string;
  treeSha: string;
  sha: string;
}

const codeChallengeSchema = new Schema<ICodeChallengeDoc>({
  repositoryId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  filePath: { type: String, required: true },
  permaUrl: { type: String, required: true, unique: true },
  treeSha: { type: String, required: true },
  sha: { type: String, required: true },
});

export const CodeChallenge = mongoose.model<ICodeChallengeDoc>(
  "code-challenges",
  codeChallengeSchema
);
