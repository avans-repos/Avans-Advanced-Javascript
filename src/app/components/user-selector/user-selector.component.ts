import { EmailSearcherService } from 'src/app/core/services/email-searcher/email-searcher.service';
import {
  BehaviorSubject,
  debounceTime, distinctUntilChanged,
} from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit {
  @Input() placeholder: string = '';

  // Search query for user email
  searchControl = new FormControl('');

  emailAddresses = new BehaviorSubject<string[]>([]);

  constructor(private emailSearcher: EmailSearcherService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      // Only check after typing for 300ms
      debounceTime(300),
      // Only emit if the value is different from the previous value
      distinctUntilChanged(),
    ).subscribe((value) => {
      // Only search if the value is at least 3 characters long
      if (value.length <= 3) {
        this.emailAddresses.next([]);
        return;
      }

      this.emailSearcher.search(value).subscribe((emails) => {
        this.emailAddresses.next(emails.map((email) => email.email));
      });
    });
  }
}
