import * as TSParser from 'tree-sitter';

import * as go from 'tree-sitter-go';
import * as rs from 'tree-sitter-rust';

export class InvalidLanguage extends Error {
  constructor(language: string) {
    super(`Error getting parser for language='${language}'`);
    Object.setPrototypeOf(this, InvalidLanguage.prototype);
  }
}

export const getTSLanguageParser = (language: string) => {
  const languageParserMap: { [key: string]: any } = {
    go,
    rs,
  };
  const langParser = languageParserMap[language];
  if (!langParser) throw new InvalidLanguage(language);
  const parser = new TSParser();
  parser.setLanguage(langParser);
  return parser;
};
