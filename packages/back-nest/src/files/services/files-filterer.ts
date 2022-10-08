import { Injectable } from '@nestjs/common';
import { GithubNode } from 'src/connectors/github/dtos/github-tree';

@Injectable()
export class FilesFilterer {
  filter(nodes: GithubNode[]) {
    return nodes
      .filter(isBlobNode)
      .filter(hasTrackedFileExt)
      .filter(isNotExcludedPath);
  }
}

function isBlobNode(node: GithubNode) {
  return node.type === 'blob';
}

function hasTrackedFileExt(node: GithubNode) {
  const trackedFileExtensions = ['.go'];
  for (const includedExt of trackedFileExtensions) {
    if (node.path.endsWith(includedExt)) {
      // ends with tracked file extension
      return true;
    }
  }
  // untracked file extension
  return false;
}

function isNotExcludedPath(node: GithubNode) {
  const excludedSubStrings = ['types', 'test', '.pb.', '.proto', 'doc'];
  for (const excludeStr of excludedSubStrings) {
    if (node.path.includes(excludeStr)) {
      // is excluded path
      return false;
    }
  }
  // is not excluded path
  return true;
}
