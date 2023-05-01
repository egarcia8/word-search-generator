import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm} from '@angular/forms';
import { PuzzleService } from '../puzzle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit, OnDestroy {
  @ViewChild('f') inputForm: NgForm;
  // word: "";
  wordList = [];
  grid = {
    gridSize: '',
    wordList: []
    }
  masterCoordinates: string[][]; 
  puzzleReady = false; 

  private subscription: Subscription;

    constructor( private puzzleService: PuzzleService) {}

  ngOnInit() {
    this.subscription = this.puzzleService.wordAdded
      .subscribe(
        (wordList: string[]) => {
          this.wordList = wordList;
        }
      )

    this.puzzleService.gridAdded
        .subscribe(
          (masterCoordinates: string[][]) => {
            this.masterCoordinates = masterCoordinates;
          }
        )
  }

  onSubmit() {
   
    console.log(this.puzzleReady);
    // this.grid.gridSize = this.inputForm.value.gridSize;
    // this.grid.wordList = this.wordList;
    // this.puzzleService.addGrid(this.grid);
  
    
  }

  onAddWord() {
   this.puzzleService.addWord(this.inputForm.value.userWord);
   this.inputForm.form.patchValue({
        userWord: ""
    });
  }

  onCreateGrid() {
    this.puzzleReady = true;
    this.grid.gridSize = this.inputForm.value.gridSize;
    this.puzzleService.makeArray(this.grid.gridSize, this.grid.gridSize, "A");
    
  }

  ngOnDestroy(): void {
    
  }
}
