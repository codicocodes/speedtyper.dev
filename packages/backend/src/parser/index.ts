import Parser from "tree-sitter";

// @ts-ignore
import JavaScript from "tree-sitter-javascript";
// @ts-ignore
import TypeScript from "tree-sitter-typescript/typescript";
// @ts-ignore
import Rust from "tree-sitter-rust";
// @ts-ignore
import Java from "tree-sitter-java";
// @ts-ignore
import C from "tree-sitter-c";
// @ts-ignore
import css from "tree-sitter-css";
// @ts-ignore
import cpp from "tree-sitter-cpp";
// @ts-ignore
import elm from "tree-sitter-elm";
// @ts-ignore
import go from "tree-sitter-go";
// @ts-ignore
import lua from "tree-sitter-lua";
// @ts-ignore
import php from "tree-sitter-php";
// @ts-ignore
import python from "tree-sitter-python";
// @ts-ignore
import ruby from "tree-sitter-ruby";
// @ts-ignore
import rust from "tree-sitter-rust";
// @ts-ignore
import csharp from "tree-sitter-c-sharp";

import strip from "strip-comments";

const MAX_LONGEST_LINE_LENGTH = 65;

const getLanguageParser = (language: string) => {
  const mapper: { [key: string]: any } = {
    TypeScript,
    JavaScript,
    Rust,
    C,
    Java,
    css,
    "c++": cpp,
    cpp,
    elm,
    go,
    lua,
    php,
    python,
    Python: python,
    ruby,
    rust,
    csharp,
    "c#": csharp,
  };

  const parser = mapper[language];

  if (!parser) throw new Error(`No parser for language: ${language}`);

  return mapper[language];
};
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

export default (
  fullCodeString: string,
  language: string
): { snippet: string; type: string }[] => {
  const tabsInSpaces = "  ";
  const strippedFullCodeString = strip(fullCodeString)
    // thank you indiemonkey
    .replace(/^\s*$(?:\r\n?|\n)/gm, "") // deleting empty lines
    .trim()
    // replace(/^(?<\s*)\t/g, two_spaces)
    .replace(/\t/g, tabsInSpaces);

  // the best thing might be ("\t", " " * tabLength)
  // so it will replace each tab individually with required number of spaces.
  // so get rid of the "^" and the "+"

  const languageParser = getLanguageParser(language);

  parser.setLanguage(languageParser);

  const tree = parser.parse(strippedFullCodeString);

  const snippets = getSnippets(tree.rootNode);

  return snippets;
};
