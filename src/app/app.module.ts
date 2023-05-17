import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import { FormsModule } from '@angular/forms';
import { PuzzleGridComponent } from './puzzle-grid/puzzle-grid.component';
import { PuzzleService } from './puzzle.service';
import { WordService } from './word.service';

@NgModule({
  declarations: [AppComponent, UserInputComponent, PuzzleGridComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [PuzzleService, WordService],
  bootstrap: [AppComponent],
})
export class AppModule {}
