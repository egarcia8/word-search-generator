import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { PuzzleService } from '../puzzle.service';
import { Subscription } from 'rxjs';
import { Direction } from '../direction.model';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit, OnDestroy {
  @ViewChild('f') inputForm: NgForm;

  // word: "";
  wordList = [];
  grid = {
    gridSize: null,
    wordList: [],
  };
  masterCoordinates: string[][];
  puzzleReady = false;
  insertedList = [];
  noFitList = [];
  shuffledWords = [];
  //checkWord = false;
  //userWord = '';

  public subscription: Subscription;

  constructor(private puzzleService: PuzzleService) {}

  ngOnInit() {
    this.subscription = this.puzzleService.wordAdded.subscribe(
      (wordList: string[]) => {
        this.wordList = wordList;
      }
    );

    this.puzzleService.gridAdded.subscribe((masterCoordinates: string[][]) => {
      this.masterCoordinates = masterCoordinates;
    });

    this.puzzleService.listAdded.subscribe((insertedList: string[]) => {
      this.insertedList = insertedList;
    });

    this.puzzleService.noFitAdded.subscribe((noFitList: string[]) => {
      this.noFitList = noFitList;
    });

    this.puzzleService.shuffledWordsAdded.subscribe(
      (shuffledWords: string[]) => {
        this.shuffledWords = shuffledWords;
      }
    );
  }

  onAddWord() {
    this.puzzleService.addWord(this.inputForm.value.userWord);
    this.inputForm.form.patchValue({
      userWord: '',
    });
  }

  onClearEntry() {
    this.wordList.splice(0);
    this.inputForm.form.patchValue({
      userWord: '',
      gridSize: null,
    });
    Object.keys(this.inputForm.controls).forEach((key) => {
      const control = this.inputForm.controls[key];
      control.markAsPristine();
      control.markAsUntouched();
    });
  }

  onCreateGrid() {
    this.puzzleReady = true;
    this.grid.gridSize = this.inputForm.value.gridSize;
    this.wordList = this.wordList;
    this.puzzleService.makeArray(this.grid.gridSize, '_', this.wordList);
  }

  onRebuildGrid() {
    this.puzzleService.makeArray(this.grid.gridSize, '_', this.wordList);
  }

  onClearGrid() {
    this.puzzleReady = false;
    this.wordList.splice(0);

    this.masterCoordinates.splice(0);
  }

  ngOnDestroy(): void {}
}
