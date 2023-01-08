import * as TSParser from 'tree-sitter';
import { Injectable } from '@nestjs/common';
import { getTSLanguageParser } from './ts-parser.factory';

// TODO: fix \t should be \s\s in the scraper/parsing layer
// TODO: Chars like ♡ should be filtered out
@Injectable()
export class ParserService {
  getParser(language: string) {
    const tsParser = getTSLanguageParser(language);
    return new Parser(tsParser);
  }
}

export enum NodeTypes {
  FunctionItem = 'function_item',
  FunctionDeclaration = 'function_declaration',
  MethodDeclaration = 'method_declaration',
}

export class Parser {
  private MAX_NODE_LENGTH = 300;
  private MIN_NODE_LENGTH = 100;
  private MAX_NUM_LINES = 11;
  private MAX_LINE_LENGTH = 55;

  constructor(private ts: TSParser) {}

  parseTrackedNodes(content: string) {
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
      case NodeTypes.FunctionDeclaration:
      case NodeTypes.FunctionItem:
      case NodeTypes.MethodDeclaration:
        // We want method declarations if they are on the root node (i.e. golang)
        return true;
      default:
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
