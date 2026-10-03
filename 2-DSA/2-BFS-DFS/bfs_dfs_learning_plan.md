# BFS and DFS Learning Plan

## 1. Purpose

Breadth-First Search (BFS) and Depth-First Search (DFS) are fundamental traversal techniques used in trees, graphs, matrices, and state-space problems.

The purpose of this plan is to build BFS and DFS knowledge gradually using **TypeScript**, visual examples, manual dry runs, reusable templates, and carefully ordered LeetCode practice.

The goal is not to memorize solutions. The goal is to recognize:

- What represents a node or state
- How to find neighboring states
- Whether BFS or DFS is more suitable
- Whether a visited structure is required
- When a node should be marked visited
- What information the traversal should calculate or return

---

## 2. Learning Outcomes

After completing this plan, you should be able to:

1. Explain BFS and DFS in simple terms.
2. Understand the role of stacks, queues, and recursion.
3. Implement recursive and iterative DFS in TypeScript.
4. Implement standard and level-order BFS in TypeScript.
5. Trace stack, queue, recursion, and visited-state changes manually.
6. Apply BFS and DFS to binary trees.
7. Apply BFS and DFS to matrices and grids.
8. Apply BFS and DFS to directed and undirected graphs.
9. Detect connected components and reachability.
10. Use BFS for shortest paths in unweighted graphs.
11. Use multi-source BFS for simultaneous spreading problems.
12. Use DFS for subtree calculations, complete paths, and structural checks.
13. Understand when backtracking is different from ordinary DFS.
14. Analyze time and space complexity.
15. Choose between BFS and DFS based on problem clues.

---

## 3. Overall Learning Order

```text
Traversal fundamentals
        ↓
Stack, queue, and recursion revision
        ↓
DFS fundamentals
        ↓
BFS fundamentals
        ↓
DFS versus BFS decision-making
        ↓
DFS and BFS on binary trees
        ↓
DFS and BFS on matrices
        ↓
DFS and BFS on graphs
        ↓
Connected components and cycle detection
        ↓
Shortest paths and multi-source BFS
        ↓
Topological sorting and advanced patterns
```

---

# Phase 1: Traversal Fundamentals

## 4. What Is Traversal?

Traversal means systematically visiting the elements of a data structure.

Depending on the problem, an element may be:

- A binary-tree node
- A graph vertex
- A matrix cell
- A word in a transformation problem
- A possible state in a puzzle

Traversal normally consists of:

1. Starting from one or more states.
2. Processing the current state.
3. Finding its neighbors.
4. Visiting valid and unvisited neighbors.
5. Stopping after the required result is found or all reachable states are processed.

## 5. Important Terminology

### Node or vertex

An individual element being visited.

### Edge

A connection between two nodes.

### Neighbor

A node that can be reached directly from the current node.

### Path

A sequence of connected nodes.

### Reachable

A node is reachable if a valid path exists from the starting node to that node.

### Connected component

A group of nodes in which each node is reachable from the others in the same group.

### Visited

A state indicating that a node has already been discovered or processed.

## 6. Five Questions Before Any Traversal

Before writing BFS or DFS, answer:

```text
1. What is a node or state?
2. What are the neighbors of a state?
3. What makes a neighbor valid?
4. When should a state be marked visited?
5. What should the traversal calculate or return?
```

### Example: Binary tree

```text
Node: a TreeNode
Neighbors: left child and right child
Valid neighbor: child is not null
Visited needed: usually no, because a valid tree has no cycles
Result: depth, sum, path, traversal order, or another property
```

### Example: Matrix

```text
Node: matrix[row][col]
Neighbors: adjacent cells
Valid neighbor: inside boundaries and satisfies the problem condition
Visited needed: normally yes, unless the matrix is modified
Result: component count, area, distance, path, or transformed matrix
```

### Example: Graph

```text
Node: graph vertex
Neighbors: adjacency-list entries
Valid neighbor: depends on the problem
Visited needed: normally yes, because graphs may contain cycles
Result: reachability, components, shortest distance, cycle status, or ordering
```

## 7. Phase 1 Exercises

1. Identify nodes and edges in a binary tree.
2. Identify the neighbors of a matrix cell.
3. Convert a small undirected graph into an adjacency list.
4. Explain why a graph may require a visited set.
5. Explain why a normal binary tree generally does not require one.

---

# Phase 2: Stack, Queue, and Recursion

## 8. Stack Fundamentals

A stack follows **Last In, First Out**.

```ts
const stack: number[] = [];

stack.push(10);
stack.push(20);
stack.push(30);

const value = stack.pop(); // 30
```

Important operations:

```text
push: add an item to the top
pop: remove the top item
peek: inspect the top item
```

DFS uses a stack. Recursive DFS uses the function-call stack automatically.

## 9. Queue Fundamentals

A queue follows **First In, First Out**.

For efficient TypeScript BFS, we can use an array with a `head` pointer:

```ts
const queue: number[] = [];
let head = 0;

queue.push(10);
queue.push(20);
queue.push(30);

while (head < queue.length) {
  const current = queue[head++];
  console.log(current);
}
```

BFS uses a queue because the earliest discovered node should be processed first.

## 10. Recursion Fundamentals

A recursive function calls itself with a smaller subproblem.

Every recursive solution requires:

1. A base condition
2. Progress toward the base condition
3. Recursive calls
4. Optional return-value combination

Example:

```ts
function countDown(value: number): void {
  if (value === 0) {
    return;
  }

  console.log(value);
  countDown(value - 1);
}
```

## 11. Understanding the Call Stack

For:

```ts
countDown(3);
```

The calls are created as:

```text
countDown(3)
  countDown(2)
    countDown(1)
      countDown(0)
```

They return in reverse order:

```text
countDown(0) returns
countDown(1) returns
countDown(2) returns
countDown(3) returns
```

This deep-first behavior is why recursion naturally supports DFS.

## 12. Phase 2 Exercises

1. Implement a stack using a TypeScript array.
2. Implement queue processing with a `head` pointer.
3. Write a recursive function to calculate `1 + 2 + ... + n`.
4. Draw the call stack for `sum(4)`.
5. Convert a simple recursive function into an iterative stack-based version.

---

# Phase 3: Depth-First Search Fundamentals

## 13. DFS Intuition

DFS explores one path deeply before returning to explore another path.

```text
        A
       / \
      B   C
     / \
    D   E
```

One possible DFS order is:

```text
A → B → D → E → C
```

The exact order depends on the order in which neighbors are processed.

## 14. Recursive DFS Process

The recursive DFS process is:

```text
1. Validate the current node.
2. Mark it visited if required.
3. Process it.
4. Recursively visit each valid neighbor.
5. Return to the previous call.
```

## 15. Recursive Graph DFS Template

```ts
function dfs(
  node: number,
  graph: Map<number, number[]>,
  visited: Set<number>
): void {
  if (visited.has(node)) {
    return;
  }

  visited.add(node);
  console.log(node);

  for (const neighbor of graph.get(node) ?? []) {
    dfs(neighbor, graph, visited);
  }
}
```

Usage:

```ts
const visited = new Set<number>();
dfs(0, graph, visited);
```

## 16. Iterative DFS Template

```ts
function dfsIterative(
  start: number,
  graph: Map<number, number[]>
): number[] {
  const stack: number[] = [start];
  const visited = new Set<number>();
  const traversal: number[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    traversal.push(node);

    const neighbors = graph.get(node) ?? [];

    for (let i = neighbors.length - 1; i >= 0; i--) {
      if (!visited.has(neighbors[i])) {
        stack.push(neighbors[i]);
      }
    }
  }

  return traversal;
}
```

Neighbors are sometimes pushed in reverse order so that iterative traversal matches a desired recursive order.

## 17. Two Ways DFS Produces Results

### Method 1: Update external state

```ts
let count = 0;

function dfs(node: TreeNode | null): void {
  if (node === null) {
    return;
  }

  count++;
  dfs(node.left);
  dfs(node.right);
}
```

### Method 2: Return information

```ts
function countNodes(node: TreeNode | null): number {
  if (node === null) {
    return 0;
  }

  const leftCount = countNodes(node.left);
  const rightCount = countNodes(node.right);

  return 1 + leftCount + rightCount;
}
```

We will prefer returned values when a parent needs results from its children.

## 18. DFS Base Conditions

A base condition stops recursion.

Common examples:

### Tree

```ts
if (node === null) {
  return;
}
```

### Matrix

```ts
if (
  row < 0 ||
  row >= rows ||
  col < 0 ||
  col >= cols ||
  visited[row][col]
) {
  return;
}
```

### Graph

```ts
if (visited.has(node)) {
  return;
}
```

## 19. DFS and Visited State

Without visited tracking, a graph cycle can cause infinite traversal:

```text
A → B → C → A → B → C → ...
```

General rule:

```ts
visited.add(node);
```

must happen before recursively exploring neighbors.

## 20. DFS Complexity

For a graph with `V` vertices and `E` edges:

```text
Time:  O(V + E)
Space: O(V)
```

Space may be used by:

- The visited set
- The recursion stack
- An explicit stack

For a matrix with `m` rows and `n` columns:

```text
Time:  O(m × n)
Space: O(m × n)
```

assuming every cell is visited once.

## 21. Common DFS Mistakes

1. Missing the base condition.
2. Marking visited after recursive calls.
3. Forgetting that graphs can contain cycles.
4. Mixing global state with return values incorrectly.
5. Forgetting to combine recursive results.
6. Using normal DFS when shortest distance is required.
7. Unmarking visited in ordinary graph DFS.
8. Forgetting to restore state in backtracking DFS.
9. Causing recursion-depth issues on very deep inputs.

## 22. DFS Practice Problems

### Beginner

1. [144. Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)
2. [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
3. [100. Same Tree](https://leetcode.com/problems/same-tree/)
4. [226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)
5. [733. Flood Fill](https://leetcode.com/problems/flood-fill/)

### Intermediate

1. [112. Path Sum](https://leetcode.com/problems/path-sum/)
2. [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)
3. [695. Max Area of Island](https://leetcode.com/problems/max-area-of-island/)
4. [841. Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/)
5. [1971. Find if Path Exists in Graph](https://leetcode.com/problems/find-if-path-exists-in-graph/)
6. [797. All Paths From Source to Target](https://leetcode.com/problems/all-paths-from-source-to-target/)

---

# Phase 4: Breadth-First Search Fundamentals

## 23. BFS Intuition

BFS explores nodes level by level.

```text
        A
       / \
      B   C
     / \
    D   E
```

BFS order:

```text
A → B → C → D → E
```

BFS first visits nodes that are one edge away, then two edges away, then three edges away, and so on.

## 24. Standard BFS Process

```text
1. Add the starting node to the queue.
2. Mark it visited.
3. Remove the next node from the queue.
4. Process it.
5. Add each valid, unvisited neighbor.
6. Repeat until the queue becomes empty.
```

## 25. Generic Graph BFS Template

```ts
function bfs(
  start: number,
  graph: Map<number, number[]>
): number[] {
  const queue: number[] = [start];
  const visited = new Set<number>([start]);
  const traversal: number[] = [];

  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    traversal.push(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return traversal;
}
```

## 26. Why BFS Marks Visited During Enqueue

Correct:

```ts
if (!visited.has(neighbor)) {
  visited.add(neighbor);
  queue.push(neighbor);
}
```

Marking the node immediately prevents two different parents from adding the same neighbor to the queue.

## 27. Level-by-Level BFS

To process one level at a time, capture the number of nodes currently waiting:

```ts
function bfsByLevel(
  start: number,
  graph: Map<number, number[]>
): number[][] {
  const queue: number[] = [start];
  const visited = new Set<number>([start]);
  const levels: number[][] = [];

  let head = 0;

  while (head < queue.length) {
    const levelSize = queue.length - head;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue[head++];
      currentLevel.push(node);

      for (const neighbor of graph.get(node) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    levels.push(currentLevel);
  }

  return levels;
}
```

## 28. BFS with Distance

Store both the node and its distance:

```ts
const queue: Array<[number, number]> = [[start, 0]];
const visited = new Set<number>([start]);
let head = 0;

while (head < queue.length) {
  const [node, distance] = queue[head++];

  if (node === target) {
    return distance;
  }

  for (const neighbor of graph.get(node) ?? []) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      queue.push([neighbor, distance + 1]);
    }
  }
}
```

## 29. Multi-Source BFS

Multi-source BFS begins from several sources simultaneously.

General process:

```text
1. Scan or identify all starting sources.
2. Add all sources to the queue.
3. Mark all sources visited.
4. Run normal BFS.
```

Example initialization:

```ts
const queue: Array<[number, number]> = [];
let head = 0;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if (grid[row][col] === sourceValue) {
      queue.push([row, col]);
    }
  }
}
```

## 30. BFS Complexity

For a graph:

```text
Time:  O(V + E)
Space: O(V)
```

For an `m × n` matrix:

```text
Time:  O(m × n)
Space: O(m × n)
```

## 31. Common BFS Mistakes

1. Using a stack instead of a queue.
2. Marking visited only when removing from the queue.
3. Forgetting to mark the starting node visited.
4. Calculating `levelSize` after changing the current level.
5. Increasing the number of steps at the wrong time.
6. Running one BFS per source when multi-source BFS is possible.
7. Using BFS for a weighted shortest-path problem without verifying the edge weights.
8. Forgetting to handle an invalid or blocked starting state.

## 32. BFS Practice Problems

### Beginner

1. [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
2. [637. Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/)
3. [111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)
4. [733. Flood Fill](https://leetcode.com/problems/flood-fill/)

### Intermediate

1. [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
2. [994. Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
3. [542. 01 Matrix](https://leetcode.com/problems/01-matrix/)
4. [1091. Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)
5. [1926. Nearest Exit from Entrance in Maze](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)
6. [127. Word Ladder](https://leetcode.com/problems/word-ladder/)

---

# Phase 5: DFS Versus BFS

## 33. Main Decision Rule

Use BFS when the problem is naturally about **levels or minimum unweighted distance**.

Use DFS when the problem is naturally about **complete paths, subtrees, connected structures, or recursive result combination**.

## 34. Decision Table

| Problem requirement | Preferred approach |
|---|---|
| Level-order traversal | BFS |
| Minimum depth | BFS |
| Shortest path in an unweighted graph | BFS |
| Nearest destination | BFS |
| Simultaneous spreading | Multi-source BFS |
| Tree height | DFS |
| Subtree sum or count | DFS |
| Root-to-leaf paths | DFS |
| Connected components | DFS or BFS |
| Number of islands | DFS or BFS |
| Backtracking | DFS |
| Cycle detection | DFS or BFS depending on graph type |
| Topological sorting | DFS or Kahn's BFS |

## 35. BFS and DFS Comparison

### DFS

```text
Primary structure: stack or recursion
Exploration: one path deeply
Useful for: structure, components, exhaustive paths
Memory risk: deep recursion
```

### BFS

```text
Primary structure: queue
Exploration: level by level
Useful for: shortest unweighted paths, levels, nearest targets
Memory risk: very wide levels
```

## 36. Decision Checklist

```text
Does the question ask for minimum steps or shortest unweighted path?
→ Consider BFS.

Does the question ask for nodes grouped by level?
→ Use BFS.

Does the parent need a result calculated from its children?
→ Consider DFS.

Does the question ask for every complete path?
→ Consider DFS or backtracking.

Does the question ask for connected components?
→ DFS or BFS can work.

Do several sources spread simultaneously?
→ Use multi-source BFS.
```

---

# Phase 6: DFS and BFS on Binary Trees

## 37. Tree Node Definition

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

## 38. Tree DFS Orders

### Preorder

```text
Root → Left → Right
```

Useful when the current node must be processed before its children.

```ts
function preorder(node: TreeNode | null, result: number[]): void {
  if (node === null) {
    return;
  }

  result.push(node.val);
  preorder(node.left, result);
  preorder(node.right, result);
}
```

### Inorder

```text
Left → Root → Right
```

For a Binary Search Tree, inorder traversal visits values in sorted order.

```ts
function inorder(node: TreeNode | null, result: number[]): void {
  if (node === null) {
    return;
  }

  inorder(node.left, result);
  result.push(node.val);
  inorder(node.right, result);
}
```

### Postorder

```text
Left → Right → Root
```

Useful when the current answer depends on both subtree answers.

```ts
function postorder(node: TreeNode | null, result: number[]): void {
  if (node === null) {
    return;
  }

  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.val);
}
```

## 39. Returning Information from Subtrees

Example: maximum depth

```ts
function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}
```

Mental model:

```text
Ask the left subtree for its answer.
Ask the right subtree for its answer.
Combine both answers for the current node.
```

## 40. Tree BFS Template

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return [];
  }

  const queue: TreeNode[] = [root];
  const result: number[][] = [];
  let head = 0;

  while (head < queue.length) {
    const levelSize = queue.length - head;
    const level: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue[head++];
      level.push(node.val);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    result.push(level);
  }

  return result;
}
```

## 41. Tree Practice Progression

### DFS

1. Binary Tree Preorder Traversal
2. Binary Tree Inorder Traversal
3. Binary Tree Postorder Traversal
4. Maximum Depth of Binary Tree
5. Same Tree
6. Invert Binary Tree
7. Path Sum
8. Diameter of Binary Tree
9. Balanced Binary Tree
10. Validate Binary Search Tree
11. Lowest Common Ancestor of a Binary Tree

### BFS

1. Binary Tree Level Order Traversal
2. Average of Levels in Binary Tree
3. Minimum Depth of Binary Tree
4. Binary Tree Right Side View
5. Binary Tree Zigzag Level Order Traversal
6. Populating Next Right Pointers in Each Node

---

# Phase 7: DFS and BFS on Matrices

## 42. Matrix as a Graph

Every cell can be considered a node.

For four-direction movement:

```ts
const directions: Array<[number, number]> = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
];
```

## 43. Matrix Boundary Validation

```ts
function isValid(
  row: number,
  col: number,
  rows: number,
  cols: number
): boolean {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}
```

Always validate a position before accessing `grid[row][col]`.

## 44. Matrix DFS Template

```ts
function dfs(row: number, col: number): void {
  if (
    row < 0 ||
    row >= rows ||
    col < 0 ||
    col >= cols ||
    visited[row][col]
  ) {
    return;
  }

  visited[row][col] = true;

  for (const [deltaRow, deltaCol] of directions) {
    dfs(row + deltaRow, col + deltaCol);
  }
}
```

## 45. Matrix BFS Template

```ts
function bfs(startRow: number, startCol: number): void {
  const queue: Array<[number, number]> = [[startRow, startCol]];
  const visited: boolean[][] = Array.from(
    { length: rows },
    () => Array(cols).fill(false)
  );

  visited[startRow][startCol] = true;
  let head = 0;

  while (head < queue.length) {
    const [row, col] = queue[head++];

    for (const [deltaRow, deltaCol] of directions) {
      const newRow = row + deltaRow;
      const newCol = col + deltaCol;

      if (
        isValid(newRow, newCol, rows, cols) &&
        !visited[newRow][newCol]
      ) {
        visited[newRow][newCol] = true;
        queue.push([newRow, newCol]);
      }
    }
  }
}
```

## 46. Matrix Practice Progression

### DFS-focused

1. Flood Fill
2. Number of Islands
3. Max Area of Island
4. Number of Enclaves
5. Surrounded Regions
6. Pacific Atlantic Water Flow

### BFS-focused

1. Flood Fill
2. Rotting Oranges
3. 01 Matrix
4. Shortest Path in Binary Matrix
5. Nearest Exit from Entrance in Maze
6. As Far from Land as Possible

---

# Phase 8: DFS and BFS on Graphs

## 47. Graph Fundamentals

We will understand:

- Directed and undirected graphs
- Weighted and unweighted graphs
- Connected and disconnected graphs
- Cyclic and acyclic graphs
- Vertex degree
- In-degree and out-degree
- Connected components

## 48. Adjacency List Representation

For edges:

```ts
const edges: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 3]
];
```

Undirected graph:

```ts
function buildGraph(
  nodeCount: number,
  edges: Array<[number, number]>
): number[][] {
  const graph: number[][] = Array.from(
    { length: nodeCount },
    () => []
  );

  for (const [first, second] of edges) {
    graph[first].push(second);
    graph[second].push(first);
  }

  return graph;
}
```

Directed graph:

```ts
for (const [from, to] of edges) {
  graph[from].push(to);
}
```

## 49. Traversing a Disconnected Graph

A single DFS or BFS only visits the component containing the start node.

To process all components:

```ts
for (let node = 0; node < graph.length; node++) {
  if (!visited.has(node)) {
    dfs(node);
  }
}
```

The number of times a new traversal starts can represent the number of connected components.

## 50. Graph Practice Progression

### Basic reachability

1. Find if Path Exists in Graph
2. Keys and Rooms
3. Clone Graph

### Connected components

1. Number of Provinces
2. Number of Connected Components in an Undirected Graph
3. Accounts Merge

### Complete paths

1. All Paths From Source to Target
2. Reconstruct Itinerary

### Cycle and coloring

1. Is Graph Bipartite?
2. Possible Bipartition
3. Course Schedule

### Shortest unweighted paths

1. Word Ladder
2. Open the Lock
3. Minimum Genetic Mutation

---

# Phase 9: Connected Components and Cycle Detection

## 51. Connected Components Pattern

```text
componentCount = 0

for every node:
    if not visited:
        componentCount++
        traverse the whole component
```

TypeScript structure:

```ts
let components = 0;
const visited = new Set<number>();

for (let node = 0; node < graph.length; node++) {
  if (!visited.has(node)) {
    components++;
    dfs(node);
  }
}
```

## 52. Cycle Detection in an Undirected Graph

During DFS, remember the parent node. An already-visited neighbor indicates a cycle only when it is not the parent.

```ts
function hasCycle(node: number, parent: number): boolean {
  visited.add(node);

  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      if (hasCycle(neighbor, node)) {
        return true;
      }
    } else if (neighbor !== parent) {
      return true;
    }
  }

  return false;
}
```

## 53. Cycle Detection in a Directed Graph

A directed graph requires tracking nodes in the current DFS path.

Possible states:

```text
0: unvisited
1: visiting, currently in recursion path
2: fully processed
```

An edge to a `visiting` node indicates a directed cycle.

---

# Phase 10: Shortest Paths and Multi-Source BFS

## 54. Unweighted Shortest Path

In an unweighted graph, BFS explores nodes in increasing edge distance from the source.

Distance template:

```ts
const distance = Array(graph.length).fill(-1);
const queue: number[] = [start];
let head = 0;

distance[start] = 0;

while (head < queue.length) {
  const node = queue[head++];

  for (const neighbor of graph[node]) {
    if (distance[neighbor] === -1) {
      distance[neighbor] = distance[node] + 1;
      queue.push(neighbor);
    }
  }
}
```

Here, `-1` also acts as an unvisited marker.

## 55. Multi-Source BFS Recognition

Look for statements such as:

- Distance from the nearest source
- All infected nodes spread simultaneously
- Several gates, zeros, fires, or rotten items begin at the same time
- Calculate the earliest arrival from any source

Practice problems:

1. Rotting Oranges
2. 01 Matrix
3. Walls and Gates
4. As Far from Land as Possible
5. Map of Highest Peak

---

# Phase 11: Topological Sorting

## 56. When Topological Sorting Is Used

Topological sorting applies to directed dependency problems such as:

- Course prerequisites
- Build dependencies
- Task ordering
- Recipe or resource dependencies

It is valid only when the relevant directed graph has no cycle.

## 57. Kahn's Algorithm Using BFS

Process:

```text
1. Calculate the in-degree of every node.
2. Add all zero-in-degree nodes to the queue.
3. Remove a node and add it to the ordering.
4. Decrease the in-degree of its outgoing neighbors.
5. Add neighbors whose in-degree becomes zero.
6. Detect a cycle if not all nodes are processed.
```

Practice problems:

1. Course Schedule
2. Course Schedule II
3. Find Eventual Safe States
4. Find All Possible Recipes from Given Supplies

## 58. DFS Topological Sort

DFS can build a topological order by adding a node after all outgoing neighbors are processed.

This is a postorder pattern and also needs directed-cycle detection.

---

# Phase 12: DFS and Backtracking

## 59. Normal DFS Versus Backtracking

Normal DFS generally marks nodes permanently during one traversal.

Backtracking makes a temporary choice, explores it, and then removes that choice so alternate paths can be tested.

```text
Choose → Explore → Undo
```

Template:

```ts
function backtrack(state: State): void {
  if (isComplete(state)) {
    saveAnswer(state);
    return;
  }

  for (const choice of getChoices(state)) {
    apply(choice);
    backtrack(state);
    undo(choice);
  }
}
```

Examples:

- Word Search
- All paths
- Permutations
- Combination Sum
- N-Queens

---

# 60. Complete Problem-Solving Checklist

Before coding:

```text
[ ] What is a node or state?
[ ] What are its neighbors?
[ ] Is the input a tree, graph, matrix, or generated state space?
[ ] Is the graph directed or undirected?
[ ] Is the graph weighted or unweighted?
[ ] Can cycles exist?
[ ] Is visited tracking required?
[ ] When should visited be marked?
[ ] Is the problem about levels or shortest distance?
[ ] Is the problem about paths, subtrees, or components?
[ ] Are there multiple starting sources?
[ ] Should traversal stop early when a target is found?
[ ] What does each recursive call return?
[ ] What information must be stored in the queue?
[ ] What are the time and space complexities?
```

---

# 61. Reusable TypeScript Templates

## Recursive DFS

```ts
function dfs(node: number): void {
  if (visited.has(node)) {
    return;
  }

  visited.add(node);

  for (const neighbor of graph[node]) {
    dfs(neighbor);
  }
}
```

## Iterative DFS

```ts
function dfs(start: number): void {
  const stack: number[] = [start];
  const visited = new Set<number>([start]);

  while (stack.length > 0) {
    const node = stack.pop()!;

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);
      }
    }
  }
}
```

## Standard BFS

```ts
function bfs(start: number): void {
  const queue: number[] = [start];
  const visited = new Set<number>([start]);
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

## Level-Order BFS

```ts
while (head < queue.length) {
  const levelSize = queue.length - head;

  for (let i = 0; i < levelSize; i++) {
    const node = queue[head++];
    // Process current level
  }
}
```

## Matrix Directions

```ts
const directions: Array<[number, number]> = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
];
```

---

# 62. Five-Week Study Schedule

## Week 1: Foundations and DFS

Topics:

- Traversal terminology
- Stack and recursion
- Recursive DFS
- Iterative DFS
- Base conditions
- Visited state
- Returning values from recursion

Practice:

- Binary Tree Preorder Traversal
- Maximum Depth of Binary Tree
- Same Tree
- Invert Binary Tree
- Flood Fill

Goal: Write DFS without copying a template.

## Week 2: BFS and Level Processing

Topics:

- Queue implementation
- Standard BFS
- Level-order BFS
- Visited timing
- Distance tracking

Practice:

- Binary Tree Level Order Traversal
- Average of Levels in Binary Tree
- Minimum Depth of Binary Tree
- Binary Tree Right Side View

Goal: Understand exactly what is inside the queue at each step.

## Week 3: Matrix DFS and BFS

Topics:

- Matrix as a graph
- Direction arrays
- Boundary validation
- Connected regions
- Multi-source BFS

Practice:

- Number of Islands
- Max Area of Island
- Rotting Oranges
- 01 Matrix
- Shortest Path in Binary Matrix

Goal: Convert a matrix question into a traversal problem.

## Week 4: General Graphs

Topics:

- Adjacency lists
- Directed and undirected graphs
- Reachability
- Disconnected components
- Cycle detection

Practice:

- Find if Path Exists in Graph
- Keys and Rooms
- Number of Provinces
- Clone Graph
- Is Graph Bipartite?

Goal: Build a graph and traverse every relevant component.

## Week 5: Advanced Patterns and Revision

Topics:

- Shortest unweighted path
- Multi-source BFS
- Topological sorting
- DFS path tracking
- Backtracking distinction

Practice:

- Course Schedule
- Course Schedule II
- Word Ladder
- All Paths From Source to Target
- Word Search

Goal: Select BFS or DFS from problem clues before writing code.

---

# 63. Standard Practice Journal Template

Copy this template for every problem.

## Problem: `<number and name>`

- Link: `<LeetCode link>`
- Difficulty: `<Easy | Medium | Hard>`
- Pattern: `<DFS | BFS | Multi-source BFS | Topological sort | Backtracking>`
- Status: `<Not started | Attempted | Solved | Revise>`

### Problem in My Own Words

```text


```

### Node and Neighbor Definition

```text
Node or state:
Neighbors:
Valid-neighbor condition:
Visited structure:
Starting state or sources:
Target or result:
```

### Why DFS or BFS?

```text
Chosen traversal:
Reason:
Why not the other traversal?
```

### Dry Run

```text
Input:

Initial stack or queue:
Visited:

Step 1:
Step 2:
Step 3:

Final result:
```

### My TypeScript Solution

```ts
function solve(): unknown {
  // Write your solution here
}
```

### Complexity

```text
V or number of states:
E or number of transitions:
Time complexity:
Space complexity:
```

### Edge Cases

```text
[ ] Empty input
[ ] One node
[ ] No edges
[ ] Cycle
[ ] Disconnected graph
[ ] Multiple valid paths
[ ] No path to target
[ ] Deep graph or tree
[ ] Duplicate edges, if allowed
```

### Mistakes and Learnings

```text
Mistake:
Root cause:
Correction:
Pattern to remember:
```

### Revision Log

```text
First attempt date:
First revision date:
Second revision date:
Can I now solve it without help?
```

---

# 64. Final Strategy

Master the concepts in this order:

```text
Understand nodes and neighbors
        ↓
Understand stack, queue, and recursion
        ↓
Implement simple DFS
        ↓
Implement simple BFS
        ↓
Learn visited-state rules
        ↓
Apply to trees
        ↓
Apply to matrices
        ↓
Apply to graphs
        ↓
Learn components, shortest paths, cycles, and ordering
```

For every new problem:

1. Draw a small example.
2. Label nodes and edges.
3. Define the neighbors.
4. Decide whether levels or depth matter.
5. Choose BFS or DFS.
6. Decide when to mark visited.
7. Dry-run the stack, queue, or recursion.
8. Write the simplest correct implementation.
9. Test difficult edge cases.
10. Record complexity and mistakes.

Consistent dry runs and pattern recognition will make BFS and DFS feel like one reusable traversal framework rather than many unrelated algorithms.
