import Parser from "tree-sitter";

export class ChallengeParser {
  constructor(private parser: Parser) {}

  parseTrackedNodes(content: string) {
    const tree = this.parser.parse(content);
    const root = tree.rootNode;
    return this._filterNodes(root).map((node) => node);
  }

  private _filterNodes(root: Parser.SyntaxNode) {
    const nodes = root.children
      .filter(filterValidNodeTypes)
      .filter(filterLongNodes)
      .filter(filterShortNodes)
      .filter(filterTooLongLines)
      .filter(filterTooManyLines);
    return nodes;
  }
}

const MAX_NUM_LINES = 12;

export function filterTooManyLines(node: Parser.SyntaxNode) {
  const lines = node.text.split("\n");
  return lines.length <= MAX_NUM_LINES;
}

const MAX_LINE_LENGTH = 55;

export function filterTooLongLines(node: Parser.SyntaxNode) {
  for (const line of node.text.split("\n")) {
    if (line.length > MAX_LINE_LENGTH) {
      return false;
    }
  }
  return true;
}

function filterValidNodeTypes(node: Parser.SyntaxNode) {
  switch (node.type) {
    case NodeTypes.FunctionDeclaration:
    case NodeTypes.FunctionItem:
    case NodeTypes.MethodDeclaration: // We want method declarations if they are on the root node (i.e. golang)
      return true;
    default:
      return false;
  }
}

const MIN_NODE_LENGTH = 100;

function filterShortNodes(node: Parser.SyntaxNode) {
  return node.text.length > MIN_NODE_LENGTH;
}

const MAX_NODE_LENGTH = 300;

function filterLongNodes(node: Parser.SyntaxNode) {
  return MAX_NODE_LENGTH > node.text.length;
}

export enum NodeTypes {
  FunctionItem = "function_item",
  FunctionDeclaration = "function_declaration",
  MethodDeclaration = "method_declaration",
}
