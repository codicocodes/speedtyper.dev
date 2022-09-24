import Parser from "tree-sitter";
import { getLanguageParser } from "./getLanguageParser";

export function getTSParserByLanguage(language: string) {
  const parser = new Parser();
  const languageParser = getLanguageParser(language);
  parser.setLanguage(languageParser);
  return parser;
}
