import Ajv, { JTDSchemaType } from "ajv/dist/jtd";

const ajv = new Ajv();

export interface GithubAccessToken {
  access_token: string;
}

const schema: JTDSchemaType<GithubAccessToken> = {
  properties: {
    access_token: { type: "string" },
  },
  additionalProperties: true,
};

export const parseGithubToken = ajv.compileParser<GithubAccessToken>(schema);
