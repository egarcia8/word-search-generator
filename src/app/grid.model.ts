export default class Grid {
  public gridSize: number;
  public wordList: string[];

  constructor(gridSize: number, wordList: string[]) {
    this.gridSize = gridSize;
    this.wordList = wordList;
  }
}
