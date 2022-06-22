import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentReference,
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { FirestoreServiceBase } from '../common/firestore-service-base';
import { Cathegory } from '../../models/cathory';

@Injectable({
  providedIn: 'root',
})
export class CathegoryService extends FirestoreServiceBase<Cathegory> {
  constructor(
    fire: Firestore,
    private snackbarService: SnackbarService,
    private authService: AuthService,
  ) {
    super(fire, 'cathegories');
  }

  override add(cathegory: Cathegory) {
    const returnValue = super.add(cathegory);
    returnValue.subscribe({
      complete: () => this.snackbarService.open('Cathegory created'),
      error: (error) => this.errorHandler(error),
    });

    return returnValue;
  }

  override update(reference: DocumentReference<Cathegory>, cathegory: Cathegory) {
    const returnValue = super.update(reference, cathegory);
    returnValue.subscribe({
      complete: () => this.snackbarService.open('Cathegory updated'),
      error: (error) => this.errorHandler(error),
    });
    return returnValue;
  }

  private errorHandler(error: any) {
    this.snackbarService.open(`Error: ${error.message}`);
  }
}
