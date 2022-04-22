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

  open(message: string, action: string, duration: number) {
    this.snackbar.open(message, action, {
      duration: duration,
    });
  }
}
