import TSParser from 'tree-sitter';
import js from 'tree-sitter-javascript';
import ts from 'tree-sitter-typescript/typescript';
import java from 'tree-sitter-java';
import c from 'tree-sitter-c';
import cpp from 'tree-sitter-cpp';
import go from 'tree-sitter-go';
import lua from 'tree-sitter-lua';
import php from 'tree-sitter-php';
import py from 'tree-sitter-python';
import rb from 'tree-sitter-ruby';
import rs from 'tree-sitter-rust';
import cs from 'tree-sitter-c-sharp';

const LanguageParserMap: { [key: string]: any } = {
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
};

export class InvalidLanguage extends Error {
  constructor(language: string) {
    super(`Error getting parser for ${language}`);
    Object.setPrototypeOf(this, InvalidLanguage.prototype);
  }
}

export const getTSLanguageParser = (language: string) => {
  const langParser = LanguageParserMap[language];
  if (!langParser) throw new InvalidLanguage(language);
  const parser = new TSParser();
  parser.setLanguage(langParser);
  return parser;
};
