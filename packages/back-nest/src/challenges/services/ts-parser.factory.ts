import TSParser from 'tree-sitter';

import js from 'tree-sitter-javascript';
import ts from 'tree-sitter-typescript';
import java from 'tree-sitter-java';
import c from 'tree-sitter-c';
import cpp from 'tree-sitter-cpp';
import lua from 'tree-sitter-lua';
import py from 'tree-sitter-python';
import rb from 'tree-sitter-ruby';
import cs from 'tree-sitter-c-sharp';
import go from 'tree-sitter-go';
import rs from 'tree-sitter-rust';
import scala from 'tree-sitter-scala';
import php from 'tree-sitter-php';

const languageParserMap: { [key: string]: any } = {
  js,
  ts,
  rs,
  c,
  java,
  cpp,
  go,
  lua,
  php,
  py,
  rb,
  cs,
  scala,
};

export const getSupportFileExtensions = () => {
  return Object.keys(languageParserMap).map((ext) => `.${ext}`);
};

export class InvalidLanguage extends Error {
  constructor(language: string) {
    super(`Error getting parser for language='${language}'`);
    Object.setPrototypeOf(this, InvalidLanguage.prototype);
  }
}

export const getTSLanguageParser = (language: string) => {
  const langParser = languageParserMap[language];
  if (!langParser) throw new InvalidLanguage(language);
  const parser: TSParser = new TSParser();
  parser.setLanguage(langParser);
  return parser;
};
