import {Injectable} from '@angular/core';

import { Subject } from 'rxjs';

import { Grid } from './grid.model';

@Injectable({providedIn: 'root'})
export class PuzzleService {
    wordAdded = new Subject<string[]>();
    gridAdded = new Subject<string[][]>();
    
  
 
    private wordList: string[] = [
    ];
    private masterCoordinates: string[][] = [];
   
    addWord(word: string) {
        this.wordList.push(word);
        this.wordAdded.next(this.wordList);
    }

    addGrid(grid: Grid) {
        console.log(grid.gridSize);
        console.log(grid.wordList);
        
    }

    makeArray(w, h, val) {
        
        let arr = [];
        for(let i = 0; i < h; i++) {
            arr[i] = [];
            for(let j = 0; j < w; j++) {
                arr[i][j] = val;
            }
        }
        this.masterCoordinates = arr;
        this.gridAdded.next(this.masterCoordinates);
      
    }
}