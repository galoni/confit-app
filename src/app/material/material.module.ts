import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatGridListModule,
  MatTableModule,
  MatStepperModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatSliderModule,
  MatListModule,
  MatDialogModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatSortModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatTableModule,
    MatSliderModule,
    MatStepperModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSortModule
  ]
})
export class MaterialModule {}
