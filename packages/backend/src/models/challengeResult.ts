import { ObjectId } from "mongoose";
import db from "mongoose";

const { Schema } = db;

const schema = new Schema({
  userId: Schema.Types.ObjectId,
  challengeId: Schema.Types.ObjectId,
  challenge: {
    name: String,
    project: String,
    projectUrl: String,
    description: String,
    language: String,
    license: String,
    licenseUrl: String,
    source: String,
    type: { type: String },
  },
  time: { type: Date, default: () => new Date() },
  totalSeconds: Number,
  stats: {
    mistakeCount: Number,
    typedCharsCount: Number,
    combo: Number,
    maxCombo: Number,
    totalCpm: Number,
    trailingCpm: Number,
    accuracy: Number,
    cpmTimeSeries: [{ cpm: Number, time: Number }],
    keyPresses: [{ time: Number, key: String, code: String }],
  },
});

export interface ChallengeResultDoc extends db.Document {
  userId: string;
  challengeId?: ObjectId;
  challenge?: {
    name: string;
    project: string;
    projectUrl: string;
    description: string;
    language: string;
    license: string;
    licenseUrl: string;
    source: string;
    type: string;
  };
  time: Date;
  totalSeconds: number;
  stats: {
    mistakeCount: number;
    typedCharsCount: number;
    combo: number;
    maxCombo: number;
    totalCpm: number;
    accuracy: number;
    cpmTimeSeries: [{ cpm: number; time: number }];
    keyPresses: [{ time: number; key: string; code: string }];
  };
}

export default db.model<ChallengeResultDoc>("challengeresult", schema);
