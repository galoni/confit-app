import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
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
  MatSliderModule
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
    MatStepperModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatSliderModule,
  ]
})
export class MaterialModule {}
