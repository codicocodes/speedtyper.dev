import Ajv, { JTDSchemaType } from "ajv/dist/jtd";

const ajv = new Ajv();

export interface GithubUser {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  email: string | null;
}

const schema: JTDSchemaType<GithubUser> = {
  properties: {
    id: { type: "int32" },
    login: { type: "string" },
    html_url: { type: "string" },
    avatar_url: { type: "string" },
    email: { type: "string", nullable: true },
  },
  additionalProperties: true,
};

export const parseGithubUser = ajv.compileParser<GithubUser>(schema);
