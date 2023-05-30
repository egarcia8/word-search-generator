import {
  Component,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent {
  @Input() isPuzzleReady: boolean;
  @Output() isPuzzleReadyChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @ViewChild('f') inputForm: NgForm;

  wordList = [];

  constructor(private puzzleService: PuzzleService) {}

  onAddWord() {
    const tempValue = this.inputForm.value.userWordInput;

    if (tempValue) {
      this.wordList.push(tempValue);
      this.inputForm.form.patchValue({
        userWordInput: '',
      });
    }
  }

  onClearEntry() {
    // Clear word list
    this.wordList.splice(0);
    // Reset form
    this.inputForm.form.patchValue({
      userWordInput: '',
      gridSizeInput: null,
    });
    // Clear validation on form
    Object.keys(this.inputForm.controls).forEach((key) => {
      const control = this.inputForm.controls[key];
      control.markAsPristine();
      control.markAsUntouched();
    });
  }

  onCreateGrid() {
    const gridSize = this.inputForm.value.gridSizeInput;

    if (gridSize && this.wordList.length > 0) {
      this.puzzleService.setGrid(gridSize, this.wordList);
      this.isPuzzleReadyChange.emit(true);
    }
  }
}
