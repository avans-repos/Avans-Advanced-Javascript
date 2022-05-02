import { EmailSearcherService } from 'src/app/core/services/email-searcher/email-searcher.service';
import {
  BehaviorSubject,
  debounceTime, distinctUntilChanged, forkJoin, lastValueFrom, skip,
} from 'rxjs';
import {
  Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SearchResult } from '../../../../core/services/email-searcher/search-result';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit {
  @ViewChild('emailInput')emailInput!: ElementRef<HTMLInputElement>;

  // Uids of users that have already been selected
  @Input() selectedUids: string[] = [];

  // Emitted when the user selects an item from the autocomplete
  @Output() selectedUidsChanged = new EventEmitter<string[]>();

  // List of users that have been selected
  selectedItems = new BehaviorSubject<SearchResult[]>([]);

  // Search query for user email
  searchControl = new FormControl('');

  // List of results to autofill the input with
  autofillEmail = new BehaviorSubject<SearchResult[]>([]);

  constructor(
    private authService: AuthService,
    private emailSearcher: EmailSearcherService,
  ) {}

  ngOnInit(): void {
    this.handleInputUids();
    this.trackSearchInput();
    this.handleEventEmitter();
  }

  // Resolves uids to emails
  private handleInputUids() {
    this.authService.authState.subscribe((user) => {
      if (user === null) { return; }
      // Add the current user to the selected items
      this.selectedItems.next([{
        uid: user.uid,
        email: user.email!,
      }]);
      if (this.selectedUids.length === 0) { return; }

      const resolvedSearchResults = this.selectedUids.map(async (uid) => ({
        email: await lastValueFrom(this.emailSearcher.getEmailFromUid(uid)),
        uid,
      }));

      // Wait for all emails to be fetched and then update UI
      forkJoin(resolvedSearchResults).subscribe((result) => {
        const emails = this.selectedItems.getValue();
        result.forEach((searchResult) => {
          // Skip if the email is already in the list
          if (emails.some((email) => email.email === searchResult.email)) { return; }
          emails.push(searchResult);
        });

        this.selectedItems.next(emails);
      });
    });
  }

  // Starts observing the search input and updates the autofill list
  private trackSearchInput() {
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
        const selectedItems = this.selectedItems.getValue();

        // Filter out the emails that are already selected and the current user
        const filteredEmails = emails.filter((email) => (
          !selectedItems.some((item) => item.email === email.email)
          && email.email !== this.authService.currentUser?.email));

        this.autofillEmail.next(filteredEmails);
      });
    });
  }

  // Handles selected event for autocomplete
  selected(event: MatAutocompleteSelectedEvent): void {
    const searchResult = event.option.value as SearchResult;
    // Update emails
    const selectedItems = this.selectedItems.value;
    selectedItems.push(searchResult);
    this.selectedItems.next(selectedItems);

    // Reset the search input
    this.emailInput.nativeElement.value = '';
    this.searchControl.setValue('');
  }

  // Handles the removal event for chips
  removeItem(item: SearchResult): void {
    const selectedItems = this.selectedItems.getValue();
    const index = selectedItems.indexOf(item);
    if (index >= 0) {
      selectedItems.splice(index, 1);
      this.selectedItems.next(selectedItems);
    }
  }

  // Observes selected items and triggers the selectedUidsChanged event
  private handleEventEmitter() {
    // Skip initial value
    this.selectedItems.pipe(skip(1)).subscribe((items) => {
      const uids = items.map((item) => item.uid);
      this.selectedUidsChanged.emit(uids);
    });
  }
}
