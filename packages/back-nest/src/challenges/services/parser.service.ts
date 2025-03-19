import TSParser from 'tree-sitter';
import { Injectable } from '@nestjs/common';
import { getTSLanguageParser } from './ts-parser.factory';

// TODO: Chars like ♡ should be filtered out
@Injectable()
export class ParserService {
  getParser(language: string) {
    const tsParser = getTSLanguageParser(language);
    return new Parser(tsParser);
  }
}

export enum NodeTypes {
  ClassDeclaration = 'class_declaration',
  ClassDefinition = 'class_definition',
  FunctionDeclaration = 'function_declaration',
  FunctionDefinition = 'function_definition',
  FunctionItem = 'function_item',
  MethodDeclaration = 'method_declaration',
  Module = 'module',
  Call = 'call',
  UsingDirective = 'using_directive',
  NamespaceDeclaration = 'namespace_declaration',
}

export class Parser {
  private MAX_NODE_LENGTH = 300;
  private MIN_NODE_LENGTH = 100;
  private MAX_NUM_LINES = 11;
  private MAX_LINE_LENGTH = 55;

  constructor(private ts: TSParser) {}

  public parseCode(content: string) {
    const root = this.ts.parse(content).rootNode;
    return this.filterNodes(root);
  }

  private filterNodes(root: TSParser.SyntaxNode) {
    const nodes = root.children
      .filter((n) => this.filterValidNodeTypes(n))
      .filter((n) => this.filterLongNodes(n))
      .filter((n) => this.filterShortNodes(n))
      .filter((n) => this.filterTooLongLines(n))
      .filter((n) => this.filterTooManyLines(n));
    return nodes;
  }

  private filterValidNodeTypes(node: TSParser.SyntaxNode) {
    switch (node.type) {
      case NodeTypes.ClassDeclaration:
      case NodeTypes.ClassDefinition:
      case NodeTypes.FunctionDeclaration:
      case NodeTypes.FunctionDefinition:
      case NodeTypes.FunctionItem:
      case NodeTypes.MethodDeclaration:
      case NodeTypes.Module:
      case NodeTypes.Call:
      case NodeTypes.UsingDirective:
      case NodeTypes.NamespaceDeclaration:
        // We want method declarations if they are on the root node (i.e. golang)
        return true;
      default:
        console.log(node.type);
        return false;
    }
  }

  private filterLongNodes(node: TSParser.SyntaxNode) {
    return this.MAX_NODE_LENGTH > node.text.length;
  }

  private filterShortNodes(node: TSParser.SyntaxNode) {
    return node.text.length > this.MIN_NODE_LENGTH;
  }

  private filterTooManyLines(node: TSParser.SyntaxNode) {
    const lines = node.text.split('\n');
    return lines.length <= this.MAX_NUM_LINES;
  }

  private filterTooLongLines(node: TSParser.SyntaxNode) {
    for (const line of node.text.split('\n')) {
      if (line.length > this.MAX_LINE_LENGTH) {
        return false;
      }
    }
    return true;
  }
}

export function removeDuplicateNewLines(rawText: string) {
  const newLine = '\n';
  const duplicateNewLine = '\n\n';
  let newRawText = rawText;
  let prevRawText = rawText;
  do {
    prevRawText = newRawText;
    newRawText = newRawText.replaceAll(duplicateNewLine, newLine);
  } while (newRawText !== prevRawText);
  return newRawText;
}

export function replaceTabsWithSpaces(rawText: string) {
  const tab = '\t';
  const spaces = '  ';
  return rawText.replaceAll(tab, spaces);
}

export function removeTrailingSpaces(rawText: string) {
  return rawText
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n');
}

export function dedupeInnerSpaces(rawText: string) {
  const innerSpaces = /(?<=\S+)\s+(?=\S+)/g;
  const space = ' ';
  return rawText
    .split('\n')
    .map((line) => line.replaceAll(innerSpaces, space))
    .join('\n');
}

export function getFormattedText(rawText: string) {
  rawText = replaceTabsWithSpaces(rawText);
  rawText = removeTrailingSpaces(rawText);
  rawText = removeDuplicateNewLines(rawText);
  rawText = dedupeInnerSpaces(rawText);
  return rawText;
}
