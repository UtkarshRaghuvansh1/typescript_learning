# Matrix Data Structure and LeetCode Learning Plan

## 1. Purpose of This Learning Plan

Matrix questions often feel difficult because they combine several concepts at once:

- Rows and columns
- Two-dimensional indexing
- Nested loops
- Boundary validation
- Movement in different directions
- Recursion, DFS, and BFS
- Graph and dynamic-programming patterns

The objective of this plan is to build these skills gradually. We will begin with basic matrix representation and traversal, then move toward common LeetCode patterns such as spiral traversal, flood fill, number of islands, shortest paths, backtracking, binary search, and dynamic programming.

The examples and solutions will primarily use **TypeScript**.

---

## 2. Learning Outcomes

By the end of this learning path, you should be able to:

1. Read and understand a matrix input correctly.
2. Identify the number of rows and columns.
3. Access and update any matrix element safely.
4. Traverse a matrix in different orders.
5. Use direction arrays to move between neighboring cells.
6. Write correct matrix boundary conditions.
7. Recognize when a matrix problem is actually a graph problem.
8. Apply DFS and BFS to grid-based problems.
9. Use backtracking to explore possible matrix paths.
10. Apply binary search to sorted matrices.
11. Solve grid-based dynamic-programming problems.
12. Analyze the time and space complexity of matrix algorithms.
13. Recognize common matrix patterns instead of memorizing solutions.

---

## 3. How Every Lesson Will Be Taught

Each lesson will follow a consistent structure.

### Step 1: Concept and Intuition

We will first understand what the concept means and why it is useful. The priority will be intuition rather than memorizing code.

### Step 2: Visual Representation

We will draw a small matrix with row and column indices so that every movement and operation is visible.

Example:

```text
          col 0   col 1   col 2
row 0       1       2       3
row 1       4       5       6
row 2       7       8       9
```

### Step 3: Simple TypeScript Implementation

We will write the simplest correct implementation before discussing optimizations.

### Step 4: Manual Dry Run

We will track important variables such as:

- `row`
- `col`
- `newRow`
- `newCol`
- Queue contents
- Recursion calls
- Visited cells

### Step 5: Small Practice Exercise

You will solve a focused exercise that tests only the concept covered in that lesson.

### Step 6: Solution Review

We will review:

- Correctness
- Boundary conditions
- Index usage
- Edge cases
- Time complexity
- Space complexity

### Step 7: Related LeetCode Problem

After the concept is clear, we will apply it to a relevant LeetCode problem.

### Step 8: Pattern Summary

At the end of every lesson, we will summarize:

- When to use the pattern
- How to identify it
- The reusable template
- Common mistakes

---

# Phase 1: Matrix Fundamentals

## 4. What Is a Matrix?

A matrix is a collection of values arranged in rows and columns.

```text
1  2  3
4  5  6
7  8  9
```

This matrix has:

- `3` rows
- `3` columns
- `9` total cells

In TypeScript, a matrix is commonly represented as an array of arrays:

```ts
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
```

Each inner array represents one row.

## 5. Understanding `matrix[row][col]`

To access a value, we provide the row index first and the column index second:

```ts
matrix[row][col]
```

For the previous matrix:

```ts
matrix[0][0]; // 1
matrix[0][2]; // 3
matrix[1][1]; // 5
matrix[2][0]; // 7
```

A useful mental model is:

```text
matrix[row][col]
       ↓     ↓
    vertical horizontal
```

- Changing `row` moves vertically.
- Changing `col` moves horizontally.

## 6. Rows and Columns

```ts
const rows = matrix.length;
const cols = matrix[0].length;
```

Before reading `matrix[0]`, we should ensure that the matrix is not empty:

```ts
if (matrix.length === 0) {
  return;
}

const rows = matrix.length;
const cols = matrix[0].length;
```

## 7. Rectangular and Square Matrices

A square matrix has the same number of rows and columns:

```text
3 x 3
```

A rectangular matrix can have different row and column counts:

```text
2 x 4
```

```ts
const matrix: number[][] = [
  [1, 2, 3, 4],
  [5, 6, 7, 8]
];
```

Here:

```ts
const rows = 2;
const cols = 4;
```

We must not assume that every matrix is square.

## 8. Phase 1 Exercises

1. Print the value at row `1`, column `2`.
2. Update the value at row `0`, column `1`.
3. Print the number of rows and columns.
4. Check whether a matrix is square.
5. Calculate the total number of cells.

---

# Phase 2: Basic Matrix Traversal

## 9. Row-by-Row Traversal

The outer loop visits rows, and the inner loop visits columns:

```ts
for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(matrix[row][col]);
  }
}
```

Traversal order:

```text
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9
```

## 10. Column-by-Column Traversal

The outer loop visits columns, and the inner loop visits rows:

```ts
const rows = matrix.length;
const cols = matrix[0].length;

for (let col = 0; col < cols; col++) {
  for (let row = 0; row < rows; row++) {
    console.log(matrix[row][col]);
  }
}
```

Traversal order:

```text
1 → 4 → 7 → 2 → 5 → 8 → 3 → 6 → 9
```

## 11. Reverse Traversal

Examples include:

- Right to left within each row
- Bottom to top within each column
- Starting from the bottom-right cell

Right-to-left traversal:

```ts
for (let row = 0; row < rows; row++) {
  for (let col = cols - 1; col >= 0; col--) {
    console.log(matrix[row][col]);
  }
}
```

## 12. Diagonal Traversal

### Main diagonal

The main diagonal contains cells where:

```text
row === col
```

```ts
for (let i = 0; i < matrix.length; i++) {
  console.log(matrix[i][i]);
}
```

For a `3 x 3` matrix, it visits:

```text
matrix[0][0], matrix[1][1], matrix[2][2]
```

### Secondary diagonal

For a square matrix of size `n`, the secondary diagonal follows:

```text
row + col === n - 1
```

```ts
const n = matrix.length;

for (let row = 0; row < n; row++) {
  const col = n - 1 - row;
  console.log(matrix[row][col]);
}
```

## 13. Boundary Traversal

Boundary traversal processes:

1. Top row
2. Right column
3. Bottom row in reverse
4. Left column from bottom to top

We must carefully avoid processing a cell twice when the matrix has only one row or one column.

## 14. Phase 2 Exercises

1. Print every matrix element row by row.
2. Print every element column by column.
3. Find the sum of all values.
4. Find the maximum value.
5. Calculate every row sum.
6. Calculate every column sum.
7. Print the main diagonal.
8. Print the secondary diagonal.
9. Print only boundary cells.

---

# Phase 3: Direction-Based Movement

## 15. Understanding Neighboring Cells

Many matrix problems require movement from one cell to another.

From cell `(row, col)`, the four direct neighbors are:

```text
             (row - 1, col)
                    ↑
(row, col - 1) ← (row, col) → (row, col + 1)
                    ↓
             (row + 1, col)
```

## 16. Four-Direction Movement

```ts
const directions: number[][] = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1]   // right
];
```

Applying a direction:

```ts
for (const [deltaRow, deltaCol] of directions) {
  const newRow = row + deltaRow;
  const newCol = col + deltaCol;
}
```

This prevents us from writing four separate blocks of almost identical code.

## 17. Eight-Direction Movement

Some problems also permit diagonal movement:

```ts
const directions: number[][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1]
];
```

The problem statement determines whether four or eight directions are allowed.

## 18. Boundary Checking

Before accessing a cell, verify that its position is valid:

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

Reusable usage:

```ts
if (isValid(newRow, newCol, rows, cols)) {
  console.log(matrix[newRow][newCol]);
}
```

## 19. Important Boundary Mistakes

Incorrect:

```ts
row <= rows
```

Correct:

```ts
row < rows
```

The final valid row index is `rows - 1`, not `rows`.

Also verify all four conditions:

```ts
row >= 0
row < rows
col >= 0
col < cols
```

## 20. Phase 3 Exercises

1. Return all valid neighbors of a cell.
2. Count the valid neighbors of a corner cell.
3. Count the valid neighbors of a center cell.
4. Find the sum of a cell's four neighbors.
5. Traverse all cells and print the position of each valid neighbor.

---

# Phase 4: Common Matrix Operations

## 21. Transpose of a Matrix

A transpose converts rows into columns.

```text
Original:          Transpose:
1  2  3            1  4
4  5  6            2  5
                   3  6
```

The relationship is:

```text
result[col][row] = matrix[row][col]
```

This pattern strengthens row-column understanding.

## 22. Rotate a Matrix by 90 Degrees

For a square matrix, a common in-place clockwise rotation technique is:

1. Transpose the matrix.
2. Reverse every row.

We will first implement rotation using an extra matrix because it is easier to understand. After that, we will implement the in-place version.

## 23. Set Matrix Zeroes

If a cell contains `0`, its complete row and column must become `0`.

We will learn three approaches:

1. Copy the matrix and modify the copy.
2. Store affected rows and columns in sets.
3. Use the first row and first column as markers for constant extra space.

This problem teaches why changing the input too early can destroy information needed later.

## 24. Spiral Traversal

Spiral traversal uses four boundaries:

```ts
let top = 0;
let bottom = rows - 1;
let left = 0;
let right = cols - 1;
```

The traversal repeatedly processes:

1. Left to right across the top
2. Top to bottom down the right
3. Right to left across the bottom
4. Bottom to top up the left

After each direction, the corresponding boundary moves inward.

## 25. Phase 4 Practice Problems

Suggested sequence:

1. Transpose Matrix
2. Reshape the Matrix
3. Flipping an Image
4. Spiral Matrix
5. Spiral Matrix II
6. Rotate Image
7. Set Matrix Zeroes

---

# Phase 5: Matrix DFS

## 26. Matrix as a Graph

A matrix can be treated as a graph:

- Every cell is a node.
- An allowed move creates an edge to a neighboring cell.
- DFS explores one path deeply before returning.

This is the key shift from simple traversal to graph traversal.

## 27. DFS Base Conditions

A DFS call should stop when:

- The position is outside the matrix.
- The cell is already visited.
- The cell does not meet the required condition.

Example template:

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

## 28. Why a Visited Matrix Is Needed

Without marking visited cells, DFS can repeatedly move between neighboring cells:

```text
A → B → A → B → ...
```

A visited matrix prevents this cycle:

```ts
const visited: boolean[][] = Array.from(
  { length: rows },
  () => Array(cols).fill(false)
);
```

Important JavaScript/TypeScript caution:

```ts
// Avoid this for nested mutable arrays:
const visited = Array(rows).fill(Array(cols).fill(false));
```

That approach can make all rows reference the same inner array.

## 29. Modifying the Input Instead of Using `visited`

Sometimes the original matrix can be modified to mark cells as visited.

Advantages:

- Avoids a separate visited matrix.
- Reduces additional space.

Disadvantages:

- Destroys or changes the original input.
- May not be permitted by the problem.
- Can make the code harder to understand.

## 30. DFS Practice Problems

Suggested sequence:

1. Flood Fill
2. Number of Islands
3. Max Area of Island
4. Island Perimeter
5. Surrounded Regions
6. Number of Enclaves
7. Pacific Atlantic Water Flow

---

# Phase 6: Matrix BFS

## 31. When to Use BFS

BFS explores cells level by level. It is particularly useful when the problem asks for:

- Minimum number of moves
- Shortest path in an unweighted grid
- Nearest target
- Time required for something to spread
- Simultaneous expansion from multiple starting points

## 32. Basic BFS Template

```ts
const queue: Array<[number, number]> = [[startRow, startCol]];
visited[startRow][startCol] = true;

let head = 0;

while (head < queue.length) {
  const [row, col] = queue[head];
  head++;

  for (const [deltaRow, deltaCol] of directions) {
    const newRow = row + deltaRow;
    const newCol = col + deltaCol;

    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < cols &&
      !visited[newRow][newCol]
    ) {
      visited[newRow][newCol] = true;
      queue.push([newRow, newCol]);
    }
  }
}
```

Using a `head` index avoids repeatedly calling `shift()`, which moves the remaining array elements.

## 33. Level-by-Level BFS

When each BFS level represents one minute or one move:

```ts
let steps = 0;

while (head < queue.length) {
  const levelSize = queue.length - head;

  for (let i = 0; i < levelSize; i++) {
    const [row, col] = queue[head++];
    // Process neighbors
  }

  steps++;
}
```

We will carefully handle whether the answer should increase before or after processing a level.

## 34. Multi-Source BFS

Multi-source BFS starts with multiple cells already in the queue.

General process:

1. Scan the matrix.
2. Add every starting cell to the queue.
3. Mark all starting cells as visited.
4. Run normal BFS.

This pattern appears when multiple cells spread or expand simultaneously.

## 35. BFS Practice Problems

Suggested sequence:

1. Rotting Oranges
2. 01 Matrix
3. Shortest Path in Binary Matrix
4. Nearest Exit from Entrance in Maze
5. As Far from Land as Possible
6. Walls and Gates

---

# Phase 7: Advanced Matrix Patterns

## 36. Backtracking in a Matrix

Backtracking is useful when we must try possible paths and undo a choice before trying another path.

General pattern:

```ts
function backtrack(row: number, col: number, index: number): boolean {
  if (index === word.length) {
    return true;
  }

  if (/* invalid position or character mismatch */) {
    return false;
  }

  const original = board[row][col];
  board[row][col] = "#";

  for (const [deltaRow, deltaCol] of directions) {
    if (backtrack(row + deltaRow, col + deltaCol, index + 1)) {
      board[row][col] = original;
      return true;
    }
  }

  board[row][col] = original;
  return false;
}
```

The important idea is:

```text
choose → explore → undo
```

Primary practice problem:

- Word Search

## 37. Binary Search in a Matrix

There are multiple sorted-matrix patterns.

### Pattern A: Matrix behaves like one sorted array

A matrix can sometimes be treated as a flattened sorted array.

Convert a one-dimensional index into coordinates:

```ts
const row = Math.floor(index / cols);
const col = index % cols;
```

This allows binary search without physically flattening the matrix.

### Pattern B: Rows and columns are independently sorted

A common approach starts from the top-right corner:

- Move left if the current value is too large.
- Move down if the current value is too small.

Practice problems:

1. Search a 2D Matrix
2. Search a 2D Matrix II

## 38. Dynamic Programming on Grids

Dynamic programming is useful when a cell's answer depends on previously computed neighboring cells.

Typical states include:

```text
dp[row][col] = number of ways to reach this cell
```

or:

```text
dp[row][col] = minimum cost to reach this cell
```

Common transitions:

```ts
dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
```

or:

```ts
dp[row][col] = grid[row][col] + Math.min(
  dp[row - 1][col],
  dp[row][col - 1]
);
```

Practice problems:

1. Unique Paths
2. Unique Paths II
3. Minimum Path Sum
4. Triangle
5. Maximal Square
6. Dungeon Game
7. Longest Increasing Path in a Matrix

---

# 39. Matrix Pattern Recognition Guide

Use these clues to identify the likely technique.

## Use Basic Traversal When

- Every cell must be processed once.
- You need sums, counts, minimums, or maximums.
- No relationship between cells needs to be explored recursively.

## Use Direction Arrays When

- The problem refers to neighboring or adjacent cells.
- Movement is allowed up, down, left, right, or diagonally.

## Use DFS When

- You need to explore connected components.
- The problem asks about islands, regions, areas, or groups.
- You need to explore all reachable cells.

## Use BFS When

- You need a shortest path in an unweighted grid.
- Changes spread one step at a time.
- The problem refers to minimum moves, nearest distance, or elapsed minutes.

## Use Multi-Source BFS When

- Several cells begin spreading at the same time.
- Distance from the closest source is needed.

## Use Backtracking When

- You must try multiple possible paths.
- A cell cannot be reused in the same path.
- A decision must be undone after exploring it.

## Use Binary Search When

- The matrix is sorted.
- The problem asks for faster-than-linear lookup.

## Use Dynamic Programming When

- Paths overlap and repeat subproblems.
- The value at one cell depends on previously solved cells.
- The problem asks for the number, minimum cost, or maximum score of paths.

---

# 40. Common Mistakes and Prevention

## Mistake 1: Confusing Rows and Columns

Remember:

```ts
matrix[row][col]
```

Use meaningful names such as `row` and `col` instead of `i` and `j` while learning.

## Mistake 2: Assuming the Matrix Is Square

Do not use `matrix.length` for both dimensions unless the problem guarantees a square matrix.

```ts
const rows = matrix.length;
const cols = matrix[0].length;
```

## Mistake 3: Accessing Before Checking Boundaries

Incorrect:

```ts
if (matrix[newRow][newCol] === 1 && isValid(newRow, newCol, rows, cols)) {
  // ...
}
```

Correct:

```ts
if (
  isValid(newRow, newCol, rows, cols) &&
  matrix[newRow][newCol] === 1
) {
  // ...
}
```

## Mistake 4: Marking a Cell Visited Too Late

For BFS, generally mark a cell visited when adding it to the queue, not when removing it. This prevents the same cell from being added multiple times.

## Mistake 5: Forgetting to Restore State in Backtracking

After exploring one path, restore the cell before returning so other paths can use it.

## Mistake 6: Infinite DFS Recursion

Ensure that the cell is marked visited before recursively visiting neighbors.

## Mistake 7: Using the Wrong Direction Count

Confirm whether the problem allows:

- Four-direction movement
- Eight-direction movement
- Only right and down
- Special moves

## Mistake 8: Modifying the Matrix Too Early

If later operations depend on original values, use additional storage or markers instead of immediately overwriting cells.

---

# 41. Complexity Analysis

For a matrix with:

- `m` rows
- `n` columns

The total number of cells is:

```text
m × n
```

## Basic Full Traversal

```text
Time:  O(m × n)
Space: O(1), excluding output
```

## DFS or BFS Visiting Every Cell Once

```text
Time:  O(m × n)
Space: O(m × n)
```

The space may be used by:

- A visited matrix
- The recursion stack
- A BFS queue

## Binary Search on a Flattened Sorted Matrix

```text
Time:  O(log(m × n))
Space: O(1)
```

## Dynamic Programming with a Full Table

```text
Time:  O(m × n)
Space: O(m × n)
```

Some DP problems can be optimized to `O(n)` additional space by storing only the previous row or updating a one-dimensional array.

---

# 42. Reusable TypeScript Templates

## Safe Matrix Dimensions

```ts
if (matrix.length === 0 || matrix[0].length === 0) {
  return;
}

const rows = matrix.length;
const cols = matrix[0].length;
```

## Full Traversal

```ts
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const value = matrix[row][col];
  }
}
```

## Four Directions

```ts
const directions: Array<[number, number]> = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
];
```

## Boundary Validation

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

## Visited Matrix

```ts
const visited: boolean[][] = Array.from(
  { length: rows },
  () => Array(cols).fill(false)
);
```

## Coordinate Queue

```ts
const queue: Array<[number, number]> = [];
let head = 0;

queue.push([startRow, startCol]);

while (head < queue.length) {
  const [row, col] = queue[head++];
}
```

---

# 43. Recommended Problem Progression

## Beginner Level

1. Richest Customer Wealth
2. Matrix Diagonal Sum
3. Transpose Matrix
4. Reshape the Matrix
5. Flipping an Image
6. Toeplitz Matrix
7. Island Perimeter

## Intermediate Level

1. Spiral Matrix
2. Rotate Image
3. Set Matrix Zeroes
4. Flood Fill
5. Number of Islands
6. Max Area of Island
7. Rotting Oranges
8. 01 Matrix
9. Search a 2D Matrix
10. Word Search
11. Unique Paths
12. Minimum Path Sum

## Advanced Level

1. Surrounded Regions
2. Pacific Atlantic Water Flow
3. Shortest Path in Binary Matrix
4. Search a 2D Matrix II
5. Maximal Square
6. Dungeon Game
7. Longest Increasing Path in a Matrix

---

# 44. Suggested Study Schedule

This schedule can be adjusted based on your available time.

## Week 1: Fundamentals and Traversal

- Matrix representation
- Rows and columns
- Element access
- Row-wise traversal
- Column-wise traversal
- Reverse traversal
- Diagonals
- Row and column sums

Goal: Become comfortable with indices and nested loops.

## Week 2: Directions and Transformations

- Four and eight directions
- Boundary checking
- Valid neighbors
- Transpose
- Reverse rows and columns
- Spiral traversal
- Rotation

Goal: Move around a matrix without index errors.

## Week 3: DFS

- Matrix as a graph
- Recursion base conditions
- Visited matrix
- Flood fill
- Connected components
- Island problems

Goal: Recognize and solve connected-region problems.

## Week 4: BFS

- Queue-based traversal
- BFS levels
- Shortest paths
- Multi-source BFS
- Rotting Oranges
- 01 Matrix

Goal: Solve distance, minimum-step, and simultaneous-spread problems.

## Week 5: Advanced Patterns

- Backtracking
- Word Search
- Matrix binary search
- Unique Paths
- Minimum Path Sum
- Mixed revision

Goal: Select the correct pattern based on problem clues.

---

# 45. Problem-Solving Checklist

Before writing code, answer these questions:

1. What do `row` and `col` represent?
2. What are `rows` and `cols`?
3. Can the matrix be empty?
4. Is the matrix square or rectangular?
5. Which movements are allowed?
6. Do I need to visit every cell?
7. Do I need a visited matrix?
8. Can I modify the original matrix?
9. Is this a connected-component problem?
10. Is a shortest path or minimum distance required?
11. Are multiple sources active simultaneously?
12. Do I need to undo choices?
13. Is the matrix sorted?
14. Does a cell's answer depend on previous cells?
15. What are the time and space complexities?

---

# 46. Final Learning Strategy

The most important goal is not to memorize many matrix solutions. It is to master a small collection of reusable ideas:

```text
Indexing
   ↓
Nested loops
   ↓
Boundary checking
   ↓
Direction arrays
   ↓
DFS and BFS
   ↓
Backtracking, binary search, and DP
```

For every problem:

1. Draw a small matrix.
2. Label row and column indices.
3. Write the permitted movements.
4. Dry-run the algorithm on a small example.
5. Test corners and boundaries.
6. Then write the complete implementation.

Following this sequence will reduce row-column confusion and make advanced matrix problems easier to recognize and solve.
