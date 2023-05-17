import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { WordService } from './word.service';

import { Grid } from './grid.model';
import { Direction } from './direction.model';

@Injectable()
export class PuzzleService {
  wordAdded = new Subject<string[]>();
  gridAdded = new Subject<string[][]>();
  listAdded = new Subject<string[]>();
  noFitAdded = new Subject<string[]>();
  shuffledWordsAdded = new Subject<string[]>();

  private wordList: string[] = [];
  private masterCoordinates: string[][] = [];
  private insertedList: string[] = [];
  private noFitList: string[] = [];
  private shuffledWords: string[] = [];

  constructor(private wordService: WordService) {}

  addWord(word: string) {
    this.wordList.push(word);
    this.wordAdded.next(this.wordList);
  }

  makeArray(gridSize: number, val: string, wordList: string[]) {
    //Setup catalog of Master Coordinates
    let catalogMasterCoordinates: number[][] = [];

    //let coordinate: number[] = [];

    //create grid where size is determined by user
    let arr = [];
    for (let x = 0; x < gridSize; x++) {
      arr[x] = [];
      for (let y = 0; y < gridSize; y++) {
        arr[x][y] = val;
        catalogMasterCoordinates.push([x, y]);
      }
    }
    this.masterCoordinates = arr;

    //Shuffle words in word list
    const shuffle = ([...array]) => {
      let m = array.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [array[m], array[i]] = [array[i], array[m]];
      }
      return array;
    };
    // const shuffle = (array)  => {
    //     array.sort(() => Math.random() -0.5);
    //     return array;
    // }
    this.shuffledWords = shuffle(wordList);
    this.insertedList = [];
    this.noFitList = [];
    //Loop through each word
    for (let word of this.shuffledWords) {
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
          [1, 0],
          [0, 1],
          [1, 1],
        ]);

        //Go through each direction and check if a word will fit
        //If not go to the next cooridinate
        for (let direction of shuffledListOfDirections) {
          let willFit = this.wordService.CheckWillFit(
            word,
            coordinate,
            this.masterCoordinates,
            direction,
            gridSize
          );
          if (willFit) {
            this.wordService.InsertWord(
              word,
              coordinate,
              this.masterCoordinates,
              direction
            );
            wordInserted = true;
            this.insertedList.push(word);
            break;
          }
        }

        //If all of the coordinates have been looped through the word does not fit
        if (shuffledListOfCoordinates.length - 1 === i) {
          this.noFitList.push(word);
        }
      }
    }

    //Replace all "_" with random characters to complete the puzzle
    function generateRandomLetter() {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';

      return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    for (let x = 0; x < this.masterCoordinates.length; x++) {
      for (let y = 0; y < this.masterCoordinates[0].length; y++) {
        let value = this.masterCoordinates[x][y];
        if (value === '_') {
          this.masterCoordinates[x][y] = generateRandomLetter();
        }
      }
    }

    let tempList: string[][] = [];
    for (let x = 0; x < this.masterCoordinates.length; x++) {
      let yList: string[] = [];
      for (let y = 0; y < this.masterCoordinates[0].length + 1; y++) {
        yList.push(this.masterCoordinates[x][y]);
      }
      tempList.push(yList);
    }
    this.gridAdded.next(this.masterCoordinates);
    this.listAdded.next(this.insertedList);
    this.noFitAdded.next(this.noFitList);
    this.shuffledWordsAdded.next(this.shuffledWords);
  }
}
