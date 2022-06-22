import { Component, OnInit } from '@angular/core';
import { Cathegory } from 'src/app/core/models/cathory';
import { BehaviorSubject, switchMap, Observable } from 'rxjs';
import { CathegoryService } from 'src/app/core/services/cathegory/cathegory.service';
import { MatDialog } from '@angular/material/dialog';
import { where } from '@angular/fire/firestore';
import { CreateComponent } from './components/create/create.component';

@Component({
  selector: 'app-cathegory',
  templateUrl: './cathegory.component.html',
  styleUrls: ['./cathegory.component.scss'],
})
export class CathegoryComponent implements OnInit {
  public cathegories: Observable<Cathegory[]>;

  public viewArchived = new BehaviorSubject<boolean>(false);

  public isLoading = true;

  constructor(cathegoryService: CathegoryService, public dialog: MatDialog) {
    this.cathegories = cathegoryService.getRealTime();
    this.cathegories = this.viewArchived.pipe(
      switchMap((viewArchived) => cathegoryService.getRealTime(
        where('isArchived', '==', viewArchived),
      )),
    );
  }

  ngOnInit(): void {
    this.cathegories.subscribe(() => { this.isLoading = false; });
  }

  createCathegory() {
    this.dialog.open(CreateComponent, {
      width: '500px',
    });
  }

  toggleViewArchived() {
    this.isLoading = true;
    this.viewArchived.next(!this.viewArchived.getValue());
  }
}
