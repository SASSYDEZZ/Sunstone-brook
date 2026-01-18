import { Position } from '../types';

interface Node {
  position: Position;
  g: number; // Cost from start
  h: number; // Heuristic cost to end
  f: number; // Total cost
  parent?: Node;
}

// Manhattan distance heuristic
function heuristic(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Check if two positions are equal
function positionEquals(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

// Get neighboring positions (4-directional movement)
function getNeighbors(pos: Position, gridSize: { width: number; height: number }): Position[] {
  const neighbors: Position[] = [];
  const directions = [
    { x: 0, y: -1 }, // Up
    { x: 1, y: 0 },  // Right
    { x: 0, y: 1 },  // Down
    { x: -1, y: 0 }, // Left
  ];

  for (const dir of directions) {
    const newPos = { x: pos.x + dir.x * 20, y: pos.y + dir.y * 20 };
    if (
      newPos.x >= 0 &&
      newPos.x < gridSize.width &&
      newPos.y >= 0 &&
      newPos.y < gridSize.height
    ) {
      neighbors.push(newPos);
    }
  }

  return neighbors;
}

/**
 * A* pathfinding algorithm
 * Returns a path from start to end position
 */
export function findPath(
  start: Position,
  end: Position,
  gridSize: { width: number; height: number } = { width: 600, height: 500 }
): Position[] {
  const openSet: Node[] = [];
  const closedSet: Set<string> = new Set();

  const startNode: Node = {
    position: start,
    g: 0,
    h: heuristic(start, end),
    f: heuristic(start, end),
  };

  openSet.push(startNode);

  while (openSet.length > 0) {
    // Find node with lowest f score
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!;

    // Check if we reached the goal
    if (positionEquals(current.position, end)) {
      const path: Position[] = [];
      let node: Node | undefined = current;
      while (node) {
        path.unshift(node.position);
        node = node.parent;
      }
      return path;
    }

    closedSet.add(`${current.position.x},${current.position.y}`);

    // Check neighbors
    const neighbors = getNeighbors(current.position, gridSize);
    for (const neighborPos of neighbors) {
      const key = `${neighborPos.x},${neighborPos.y}`;
      if (closedSet.has(key)) continue;

      const g = current.g + 1;
      const h = heuristic(neighborPos, end);
      const f = g + h;

      const existingNode = openSet.find((n) =>
        positionEquals(n.position, neighborPos)
      );

      if (!existingNode) {
        openSet.push({
          position: neighborPos,
          g,
          h,
          f,
          parent: current,
        });
      } else if (g < existingNode.g) {
        existingNode.g = g;
        existingNode.f = f;
        existingNode.parent = current;
      }
    }
  }

  // No path found, return direct line
  return [start, end];
}
