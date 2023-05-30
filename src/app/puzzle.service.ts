import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { WordService } from './word.service';

import Grid from './grid.model';
import DIRECTION from './direction.model';

@Injectable()
export class PuzzleService {
  private grid: Grid;

  masterGrid = new Subject<string[][]>();
  wordsUsedList = new Subject<string[]>();
  wordsNoFitList = new Subject<string[]>();

  constructor(private wordService: WordService) {}

  setGrid(gridSize: number, wordList: string[]) {
    this.grid = new Grid(gridSize, wordList);
  }

  makeArray() {
    if (this.grid == null) throw 'Grid can not be null';
    let shuffledWords = [];
    let masterCoordinates: string[][] = [];
    let insertedList: string[] = [];
    let noFitList: string[] = [];

    //Setup catalog of Master Coordinates
    let catalogMasterCoordinates: number[][] = [];

    //let coordinate: number[] = [];

    //create grid where size is determined by user
    let arr = [];
    for (let x = 0; x < this.grid.gridSize; x++) {
      arr[x] = [];
      for (let y = 0; y < this.grid.gridSize; y++) {
        arr[x][y] = '_';
        catalogMasterCoordinates.push([x, y]);
      }
    }
    masterCoordinates = arr;

    //Shuffle words in word list
    const shuffle = ([...array]) => {
      let m = array.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [array[m], array[i]] = [array[i], array[m]];
      }
      return array;
    };

    shuffledWords = shuffle(this.grid.wordList);
    insertedList = [];
    noFitList = [];
    //Loop through each word
    for (let word of shuffledWords) {
      //Shuffle coordinates to loop through
      let shuffledListOfCoordinates: number[] = shuffle(
        catalogMasterCoordinates
      );
      let wordInserted = false;

      //Go through each shuffled coordinate
      for (let i = 0; i < shuffledListOfCoordinates.length; i++) {
        if (wordInserted) break;
        let coordinate = shuffledListOfCoordinates[i];

        //Create list of directions and then shuffle them
        //let directions = new Direction();
        //let shuffledListOfDirections = shuffle(directions);
        let shuffledListOfDirections = shuffle([
          DIRECTION.Horizontal,
          DIRECTION.Vertical,
          DIRECTION.Diagonal,
        ]);

        //Go through each direction and check if a word will fit
        //If not go to the next cooridinate
        for (let direction of shuffledListOfDirections) {
          let willFit = this.wordService.CheckWillFit(
            word,
            coordinate,
            masterCoordinates,
            direction,
            this.grid.gridSize
          );
          if (willFit) {
            this.wordService.InsertWord(
              word,
              coordinate,
              masterCoordinates,
              direction
            );
            wordInserted = true;
            insertedList.push(word);
            break;
          }
        }

        //If all of the coordinates have been looped through the word does not fit
        if (shuffledListOfCoordinates.length - 1 === i) {
          noFitList.push(word);
        }
      }
    }

    //Replace all "_" with random characters to complete the puzzle
    function generateRandomLetter() {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';

      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    for (let x = 0; x < masterCoordinates.length; x++) {
      for (let y = 0; y < masterCoordinates[0].length; y++) {
        let value = masterCoordinates[x][y];
        if (value === '_') {
          masterCoordinates[x][y] = generateRandomLetter();
        }
      }
    }

    let tempList: string[][] = [];
    for (let x = 0; x < masterCoordinates.length; x++) {
      let yList: string[] = [];
      for (let y = 0; y < masterCoordinates[0].length + 1; y++) {
        yList.push(masterCoordinates[x][y]);
      }
      tempList.push(yList);
    }

    this.masterGrid.next(masterCoordinates);
    this.wordsUsedList.next(insertedList);
    this.wordsNoFitList.next(noFitList);
  }
}
