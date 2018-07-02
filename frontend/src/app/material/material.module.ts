import { NgModule } from "@angular/core";
import { CdkTableModule } from "@angular/cdk/table";

import {
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CdkTableModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CdkTableModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}
