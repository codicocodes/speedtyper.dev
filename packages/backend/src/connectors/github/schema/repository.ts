import Ajv, { JTDSchemaType } from "ajv/dist/jtd";

const ajv = new Ajv();

export interface GithubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  url: string;
  trees_url: string;
  homepage: string;
  stargazers_count: number;
  // FIXME: language should be enum
  language: string;
  default_branch: string;
}

const schema: JTDSchemaType<GithubRepository> = {
  properties: {
    id: { type: "int32" },
    node_id: { type: "string" },
    name: { type: "string" },
    full_name: { type: "string" },
    html_url: { type: "string" },
    description: { type: "string" },
    url: { type: "string" },
    trees_url: { type: "string" },
    homepage: { type: "string" },
    stargazers_count: { type: "int32" },
    // FIXME: language should be enum
    language: { type: "string" },
    default_branch: { type: "string" },
  },
  additionalProperties: true,
};

export const parseGithubRepository =
  ajv.compileParser<GithubRepository>(schema);
