import { MatSnackBar } from "@angular/material";
import { Injectable } from "@angular/core";

@Injectable()
export class NotificationService {
  private durationDefault: number = 3000;
  constructor(private snackBar: MatSnackBar) {}

  notify(message: string) {
    this.snackBar.open(message, null, {
      duration: this.durationDefault
    });
  }
}
