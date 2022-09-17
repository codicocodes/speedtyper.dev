import Ajv, { JTDSchemaType } from "ajv/dist/jtd";

const ajv = new Ajv();

export interface GithubNode {
  path: string;
  mode: string;
  // FIXME: type should be enum ["blob", "tree"]
  type: string;
  sha: string;
  size?: number;
  url: string;
}

export interface GithubTree {
  sha: string;
  url: string;
  tree: GithubNode[];
}

const treeSchema: JTDSchemaType<GithubTree> = {
  properties: {
    sha: { type: "string" },
    url: { type: "string" },
    tree: {
      elements: {
        properties: {
          path: { type: "string" },
          mode: { type: "string" },
          type: { type: "string" },
          sha: { type: "string" },
          url: { type: "string" },
        },
        optionalProperties: {
          size: { type: "int32" },
        },
      },
    },
  },
  additionalProperties: true,
};

export const parseGithubTree = ajv.compileParser<GithubTree>(treeSchema);
