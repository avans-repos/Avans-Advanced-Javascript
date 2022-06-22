import { Component, OnInit } from '@angular/core';
import { Cathegory } from 'src/app/core/models/cathory';
import { Timestamp, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CathegoryService } from 'src/app/core/services/cathegory/cathegory.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './components/create/create.component';

@Component({
  selector: 'app-cathegory',
  templateUrl: './cathegory.component.html',
  styleUrls: ['./cathegory.component.scss'],
})
export class CathegoryComponent implements OnInit {
  public cathegories: Observable<Cathegory[]>;

  public isLoading = true;

  constructor(cathegoryService: CathegoryService, public dialog: MatDialog) {
    this.cathegories = cathegoryService.getRealTime(
      where('endDate', '>=', Timestamp.now()),
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
}
