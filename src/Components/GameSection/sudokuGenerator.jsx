import SudokuService from "./sudokuService";
class SudokuGenerator {
  solvingProcess = [];

  //(Check for unused values in Box)
  unUsedInBox(rowStart, colStart, num, grid) {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[rowStart + i][colStart + j] === num) return false;
    return true;
  }

  //(Used to generate random numbers between 1 to 9)
  randomGenerator = num => Math.floor(Math.random() * num + 1) ;

  //(Fill the Box of the sudoku using random number generator)
  fillBox(row, col, grid) {
    var num;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        do {
          num = this.randomGenerator(9);
        } while (!this.unUsedInBox(row, col, num, grid));
        grid[row + i][col + j] = num;
      }
    }
  }

  //(Used to fill the diagonal element of the 9*9 Sudoku grid)
  fillDiagonal(grid) {
    for (let i = 0; i < 9; i = i + 3) this.fillBox(i, i, grid);
  }

  //(Used to remove digits to set difficulty levels)
  removeKDigits(grid, rem) {
    let count = rem;
    while (count !== 0) {
      let cellId = this.randomGenerator(9 * 9) - 1;
      let i = Math.floor(cellId / 9);
      let j = cellId % 9;
      if (grid[i][j] !== 0) {
        count--;
        grid[i][j] = 0;
      }
    }
  }

  fillValues(grid, rem) {
    this.fillDiagonal(grid);
    SudokuService.solve(grid);
    this.removeKDigits(grid, rem);
  }

  generate(l) {
    var Kvalue = [45, 49, 53, 64, 81];
    let rem = Kvalue[l];
    var grid = Array(9);
    for (let i = 0; i < 9; i++) grid[i] = Array(9).fill(0);
    this.fillValues(grid, rem);
    return grid;
  }
}
export default new SudokuGenerator();
