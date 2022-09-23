import Ajv, { JTDSchemaType } from "ajv/dist/jtd";

const ajv = new Ajv();

export interface GithubBlob {
  sha: string;
  node_id: string;
  size: number;
  url: string;
  content: string;
  encoding: "base64";
}

const schema: JTDSchemaType<GithubBlob> = {
  properties: {
    sha: { type: "string" },
    node_id: { type: "string" },
    size: { type: "int32" },
    url: { type: "string" },
    content: { type: "string" },
    encoding: { enum: ["base64"] },
  },
  additionalProperties: true,
};

export const parseGithubRepository = ajv.compileParser<GithubBlob>(schema);
