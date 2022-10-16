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

export const getLanguageParser = (language: string) => {
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
