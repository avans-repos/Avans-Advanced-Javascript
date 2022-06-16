import { EmailSearcherService } from 'src/app/core/services/email-searcher/email-searcher.service';
import {
  BehaviorSubject, debounceTime, distinctUntilChanged, filter, forkJoin,
  lastValueFrom, merge, mergeMap, skip,
} from 'rxjs';
import {
  Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SearchResult } from 'src/app/core/services/email-searcher/search-result';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit {
  @ViewChild('emailInput')emailInput!: ElementRef<HTMLInputElement>;

  // Uids of users that have already been selected
  @Input() selectedUids: string[] = [];

  @Input() ownerUid: string | undefined;

  // Emitted when the user selects an item from the autocomplete
  @Output() readonly selectedUidsChanged = new EventEmitter<string[]>();

  // List of users that have been selected
  readonly selectedItems = new BehaviorSubject<SearchResult[]>([]);

  // Search query for user email
  readonly searchControl = new FormControl('');

  // List of results to autofill the input with
  readonly autofillEmail = new BehaviorSubject<SearchResult[]>([]);

  readonly authState = this.authService.authState;

  isLoadingItems = true;

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
    const user = this.authService.currentUser;
    if (user === null) { return; }
    // Add the current user to the selected items
    this.selectedItems.next([{
      uid: user.uid,
      email: user.email!,
    }]);

    if (this.selectedUids.length === 0) {
      this.isLoadingItems = false;
      return;
    }

    const resolvedSearchResults = this.selectedUids.map(async (uid) => ({
      email: await lastValueFrom(this.emailSearcher.getEmailFromUid(uid)),
      uid,
    }));

    merge(...resolvedSearchResults).subscribe((searchResult) => {
      const selectedItems = this.selectedItems.getValue();
      if (selectedItems.find((item) => item.uid === searchResult.uid)) { return; }
      selectedItems.push(searchResult);
      this.selectedItems.next(selectedItems);
    });

    forkJoin(resolvedSearchResults).subscribe(() => {
      this.isLoadingItems = false;
    });
  }

  // Starts observing the search input and updates the autofill list
  private trackSearchInput() {
    this.searchControl.valueChanges.pipe(
      // Only check after typing for 300ms
      debounceTime(300),
      // Only emit if the value is different from the previous value
      distinctUntilChanged(),
      // Only emit if length is greater greater than 2
      filter((value) => value.length > 2),
      // Pass value to email searcher
      mergeMap((value) => this.emailSearcher.search(value)),
    ).subscribe((emails) => {
      const selectedItems = this.selectedItems.getValue();

      // Filter out the emails that are already selected and the current user
      const filteredEmails = emails.filter((email) => (
        !selectedItems.some((item) => item.email === email.email)
        && email.email !== this.authService.currentUser?.email));

      this.autofillEmail.next(filteredEmails);
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
    // Do not remove if the item is the current user or the owner
    if (item.uid === this.authService.currentUser?.uid || item.uid === this.ownerUid) { return; }

    // Do not remove if the item is the current user
    if (item.uid === this.authService.currentUser?.uid) { return; }
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
