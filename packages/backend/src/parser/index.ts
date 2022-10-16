import Parser from "tree-sitter";

import strip from "strip-comments";
import { getLanguageParser } from "./getLanguageParser";

const MAX_LONGEST_LINE_LENGTH = 65;

const longestLineIsTooLong = (snippet: string) =>
  snippet.split("\n").findIndex((line) => {
    return line.length > MAX_LONGEST_LINE_LENGTH;
  }) > 0;

const getSnippets = (
  node: Parser.SyntaxNode
): { snippet: string; type: string }[] => {
  return node.children
    .map((child) => {
      if (
        child.type === "if_statement" ||
        child.type === "import_statement" ||
        child.type === "comment" ||
        child.type === "type_assertion" ||
        child.type === "binary_expression" ||
        child.type === "ERROR"
      ) {
        return null;
      }

      const snippet = child.text;

      if (snippet.indexOf("isJavaScriptProtocol") >= 0) {
        return null;
      }

      if (snippet.length > 300) {
        return getSnippets(child);
      }

      if (snippet.length > 130 && snippet.length < 300) {
        if (longestLineIsTooLong(snippet)) {
          return null;
        }

        return { snippet, type: child.type };
      }

      return null;
    })
    .flat()
    .filter(Boolean)
    .map((snippetHolder) => {
      const { snippet, type } = snippetHolder as {
        snippet: string;
        type: string;
      };
      return {
        snippet: snippet

          .split("\n")
          .map((subSnippet: string) => subSnippet.trimEnd())
          .join("\n")
          .trim(),
        type,
      };
    });
};

const parser = new Parser();

function removeEmptyLines(content: string) {
  return content
    .replace(/^\s*$(?:\r\n?|\n)/gm, "") // deleting empty lines
    .trim();
}

const TABS_IN_SPACES = "  ";

function replaceTabsWithSpaces(content: string) {
  return content.replace(/\t/g, TABS_IN_SPACES);
}

export default (
  fullCodeString: string,
  language: string
): { snippet: string; type: string }[] => {
  const strippedFullCodeString = [fullCodeString]
    .map((s) => strip(s))
    .map(removeEmptyLines)
    .map(replaceTabsWithSpaces)[0];

  const languageParser = getLanguageParser(language);
  parser.setLanguage(languageParser);

  const tree = parser.parse(strippedFullCodeString);

  const snippets = getSnippets(tree.rootNode);

  return snippets;
};
