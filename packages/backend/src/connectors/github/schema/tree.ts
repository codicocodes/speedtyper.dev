import Ajv, { JTDSchemaType } from "ajv/dist/jtd";

const ajv = new Ajv();

export enum GithubNodeType {
  blob = "blob",
  tree = "tree",
}

export interface GithubNode {
  path: string;
  mode: string;
  type: "blob" | "tree";
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
          type: { enum: ["blob", "tree"] },
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
