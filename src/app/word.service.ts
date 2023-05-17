export class WordService {
  //Method to check if word will fit
  CheckWillFit(
    word: string,
    coordinate: number,
    masterCoordinates: string[][],
    direction: number[],
    gridSize: number
  ): boolean {
    //Keep track of current position
    let row = coordinate[0];
    let col = coordinate[1];

    //Checks to ensure starting coordinate will not go out of bounds
    for (let ch of word) {
      if (row >= gridSize || col >= gridSize) {
        return false;
      }
      //Setting current cooridinate equal to the Master Coordinate grid to check position
      let currentCoordinateValue = masterCoordinates[row][col];
      if (currentCoordinateValue != '_' && currentCoordinateValue != ch) {
        return false;
      }
      //Incrementing by direction(x, y)
      row = row + direction[0]; //X
      col = col + direction[1]; //Y
    }
    return true;
  }

  //Method to insert word into grid
  InsertWord(
    word: string,
    coordinate: number,
    masterCoordinates: string[][],
    direction: number[]
  ) {
    //Keep track of the current position
    let row = coordinate[0];
    let col = coordinate[1];

    //Insert each ch by starting with current position
    //Continue inserting at next position
    for (let ch of word) {
      masterCoordinates[row][col] = ch;
      row = row + direction[0]; //X
      col = col + direction[1]; //Y
    }
  }
}
