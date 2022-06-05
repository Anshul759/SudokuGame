export const EMPTY_GRID = () =>
  new Array(9).fill(null).map(() => new Array(9).fill(0));

class SudokuService {
  //(Store every step of the solving process)
  solvingProcess = [];

  //(Find the empty position of the Sudoku)
  findEmpty(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 0) return { i, j };
      }
    }
    return false;
  }

  //(Check if the current configuration of sudoku is safe)
  isSafe(grid, row, col, num) {
    for (let i = 0; i < grid.length; i++) {
      if (grid[i][col] === num && i !== row) return false;
      if (grid[row][i] === num && i !== col) return false;
    }
    const x = Math.floor(row / 3) * 3;
    const y = Math.floor(col / 3) * 3;

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        if (grid[i][j] === num && i !== row && j !== col) return false;
      }
    }

    return true;
  }

  //(Solve sudoku in recursive process by storing every step)
  solveRecursive(grid) {
    this.solvingProcess.push(grid.map((arr) => arr.slice()));
    const find = this.findEmpty(grid);
    let position;
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    if (find) {
      position = find;
    } else return true;

    while (nums.length !== 0) {
      const num = nums[0];

      if (this.isSafe(grid, position.i, position.j, num)) {
        grid[position.i][position.j] = Number(num);
        if (this.solveRecursive(grid)) return true;
        grid[position.i][position.j] = 0;
      }
      nums.shift();
    }

    return false;
  }

  solve(grid) {
    this.solvingProcess = [];
    this.solveRecursive(grid);
    return this.solvingProcess;
  }

  //(Check the answer solved by the user to show results)
  checkans(grid) {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (!this.isSafe(grid, i, j, grid[i][j])) return false;
    return true;
  }
}
export default new SudokuService();
