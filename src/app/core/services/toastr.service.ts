import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  snackBar = inject(MatSnackBar);

  config: MatSnackBarConfig = {
    horizontalPosition: 'left',
    duration: 3000,
  };
  open(message: string, action: string = '✖', duration = 3000) {
    return this.snackBar.open(message, action, {
      ...this.config,
      duration,
    });
  }
}
