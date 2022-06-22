import { Transaction } from 'src/app/core/models/transaction';
import { Component, Input } from '@angular/core';
import { Required } from 'src/app/core/decorators/required-input';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss'],
})
export class MonthViewComponent {
  @Input() @Required public transactions!: Transaction[];
}
