import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Service to messages to be shown in the snackbar.
 */
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  open(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackbar.open(message, action, {
      duration: duration,
    });
  }
}
