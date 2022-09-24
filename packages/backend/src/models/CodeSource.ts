import db from "mongoose";

const { Schema } = db;

const schema = new Schema({
  name: String,
  project: String,
  projectUrl: String,
  description: String,
  language: String,
  license: String,
  licenseUrl: String,
  source: { type: String, unique: true },
  parsed: { type: Boolean, default: false },
  githubCodeString: String,
});

export interface CodeSourceDoc extends db.Document {
  _id?: db.Schema.Types.ObjectId;
  name: string;
  project: string;
  projectUrl: string;
  description: string;
  language: string;
  license: string;
  source: string;
  licenseUrl: string;
  parsed: boolean;
  githubCodeString?: string;
}

export interface ICodeSource {
  _id?: db.Schema.Types.ObjectId;
  name: string;
  project: string;
  projectUrl: string;
  description: string;
  language: string;
  license: string;
  source: string;
  licenseUrl: string;
  parsed: boolean;
  githubCodeString?: string;
}

export default db.model<CodeSourceDoc>("codesource", schema);
