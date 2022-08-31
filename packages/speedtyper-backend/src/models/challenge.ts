import db from "../db";
import { IChar } from "../types";

const { Schema } = db;

const schema = new Schema({
  name: String,
  project: String,
  projectUrl: String,
  description: String,
  language: String,
  license: String,
  licenseUrl: String,
  source: String,
  fullCodeString: String,
  type: String,
});

export interface ChallengeDoc extends db.Document {
  name: string;
  project: string;
  projectUrl: string;
  description: string;
  language: string;
  license: string;
  licenseUrl: string;
  source: string;
  fullCodeString: string;
  strippedCode: string;
  chars: IChar[];
  type: string;
}

export default db.model<ChallengeDoc>("challenge", schema);
