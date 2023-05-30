import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-puzzle-grid',
  templateUrl: './puzzle-grid.component.html',
  styleUrls: ['./puzzle-grid.component.css'],
})
export class PuzzleGridComponent implements OnInit {
  @Input() isPuzzleReady: boolean;
  @Output() isPuzzleReadyChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  masterCoordinates: string[][];
  insertedList = [];
  noFitList = [];

  masterCoordinateSubscription: Subscription;
  insertedListSubscription: Subscription;
  noFitListSubscription: Subscription;

  constructor(private puzzleService: PuzzleService) {}

  ngOnInit() {
    this.masterCoordinateSubscription = this.puzzleService.masterGrid.subscribe(
      (masterCoordinates: string[][]) => {
        this.masterCoordinates = masterCoordinates;
      }
    );

    this.insertedListSubscription = this.puzzleService.wordsUsedList.subscribe(
      (insertedList: string[]) => {
        this.insertedList = insertedList;
      }
    );

    this.noFitListSubscription = this.puzzleService.wordsNoFitList.subscribe(
      (noFitList: string[]) => {
        this.noFitList = noFitList;
      }
    );

    this.puzzleService.makeArray();
  }

  onRebuildGrid() {
    this.puzzleService.makeArray();
  }

  onClearGrid() {
    this.isPuzzleReadyChange.emit(false);
  }

  ngOnDestroy(): void {
    this.masterCoordinateSubscription.unsubscribe();
    this.insertedListSubscription.unsubscribe();
    this.noFitListSubscription.unsubscribe();
  }
}
