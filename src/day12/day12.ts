import { formatFileName, openFileReader } from '../shared/file';

// modeling the graph as adjacency lists
type Node = string;
type Graph = { [start: Node]: string[] };
type Visited = { [start: Node]: boolean };

let distinctPaths = new Set();
let visited: Visited = {};
function dfsWithBacktrack(graph: Graph, node: Node, pathSoFar = '') {
  if (node === 'end') {
    distinctPaths.add(pathSoFar);
    return;
  }
  // don't treat capitalized nodes as visited ever, since they are considered "big caves"
  // and can be visited more than once. I assume this means they never produce cycles...
  if (node !== node.toUpperCase()) {
    visited[node] = true;
  }
  const neighbors = graph[node] || [];
  for (const neighbor of neighbors) {
    if (!visited[neighbor]) {
      dfsWithBacktrack(graph, neighbor, `${pathSoFar},${node}`);
    }
  }
  // unsetting visited here is effectively backtracking
  visited[node] = false;
}

// part2 changes the rules a bit. we can now double-visit one small cave
let doubleVisitAlready = false;
function dfsWithBacktrack2(graph: Graph, node: Node, pathSoFar = '') {
  if (node === 'end') {
    distinctPaths.add(pathSoFar);
    return;
  }
  // don't treat capitalized nodes as visited ever, since they are considered "big caves"
  // and can be visited more than once. I assume this means they never produce cycles...
  if (node !== node.toUpperCase()) {
    visited[node] = true;
  }
  const neighbors = graph[node] || [];
  for (const neighbor of neighbors) {
    if (!visited[neighbor]) {
      dfsWithBacktrack2(graph, neighbor, `${pathSoFar},${node}`);
    }
  }
  // unsetting visited here is effectively backtracking
  visited[node] = false;
  if (!doubleVisitAlready && node !== 'start') {
    doubleVisitAlready = true;
    // try double visiting the current node by traversing its neighbors against after it's un-visited
    for (const neighbor of neighbors) {
      if (!visited[neighbor]) {
        dfsWithBacktrack2(graph, neighbor, `${pathSoFar},${node}`);
      }
    }
    doubleVisitAlready = false;
  }
}

function resetGlobals() {
  // eww... need to reset the globals for each invocation, otherwise it is not reset between runs
  distinctPaths = new Set();
  visited = {};
  doubleVisitAlready = false;
}

export async function day12({ example }: { example: boolean }) {
  const rl = await openFileReader(formatFileName(12, example));
  const graph: Graph = {};
  for await (const line of rl) {
    const [node, neighbor] = line.split('-');
    if (!graph[node]) {
      graph[node] = [];
    }
    graph[node].push(neighbor);
    if (!graph[neighbor]) {
      graph[neighbor] = [];
    }
    graph[neighbor].push(node);
  }
  resetGlobals();
  dfsWithBacktrack(graph, 'start');
  const part1 = distinctPaths.size;
  resetGlobals();
  dfsWithBacktrack2(graph, 'start');
  const part2 = distinctPaths.size;
  return { part1, part2 };
}
