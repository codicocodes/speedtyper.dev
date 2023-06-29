import * as TSParser from 'tree-sitter';

import * as js from 'tree-sitter-javascript';
import * as ts from 'tree-sitter-typescript/typescript';
import * as java from 'tree-sitter-java';
import * as c from 'tree-sitter-c';
import * as cpp from 'tree-sitter-cpp';
import * as lua from 'tree-sitter-lua';
import * as php from 'tree-sitter-php';
import * as py from 'tree-sitter-python';
import * as rb from 'tree-sitter-ruby';
import * as cs from 'tree-sitter-c-sharp';
import * as go from 'tree-sitter-go';
import * as rs from 'tree-sitter-rust';
import * as scala from 'tree-sitter-scala';

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
  const parser = new TSParser();
  parser.setLanguage(langParser);
  return parser;
};
