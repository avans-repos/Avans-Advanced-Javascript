import { EmailSearcherService } from 'src/app/core/services/email-searcher/email-searcher.service';
import {
  BehaviorSubject,
  debounceTime, distinctUntilChanged,
} from 'rxjs';
import {
  Component, ElementRef, Input, OnInit, ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SearchResult } from '../../core/services/email-searcher/search-result';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit {
  @ViewChild('emailInput')emailInput!: ElementRef<HTMLInputElement>;

  @Input() placeholder: string = '';

  public selectedEmail = new BehaviorSubject<string[]>([]);

  // Search query for user email
  searchControl = new FormControl('');

  autofillEmail = new BehaviorSubject<SearchResult[]>([]);

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
        this.autofillEmail.next([]);
        return;
      }

      this.emailSearcher.search(value).subscribe((emails) => {
        // Filter out the emails that are already selected
        const selectedEmailAddresses = this.selectedEmail.getValue();
        const filteredEmails = emails.filter(
          (email) => selectedEmailAddresses.indexOf(email.email) === -1,
        );
        this.autofillEmail.next(filteredEmails);
      });
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // Add to list
    const emailAddress = event.option.viewValue;
    const emailAddresses = this.selectedEmail.value;
    emailAddresses.push(emailAddress);
    this.selectedEmail.next(emailAddresses);
    this.emailInput.nativeElement.value = '';
    this.searchControl.setValue('');
  }

  removeEmail(emailAddress: string): void {
    const selectedEmailAddresses = this.selectedEmail.getValue();
    selectedEmailAddresses.splice(selectedEmailAddresses.indexOf(emailAddress), 1);
    this.selectedEmail.next(selectedEmailAddresses);
  }
}
