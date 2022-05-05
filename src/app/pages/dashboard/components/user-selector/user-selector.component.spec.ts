import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EmailSearcherService } from 'src/app/core/services/email-searcher/email-searcher.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SearchResult } from 'src/app/core/services/email-searcher/search-result';
import { UserSelectorComponent } from './user-selector.component';
import { of } from 'rxjs';

describe('UserSelectorComponent', () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;

  beforeEach(() => {
    const emailSearcherServiceStub = () => ({
      getEmailFromUid: (uid: string) => ({}),
      search: (value: string) => ({})
    });
    const authServiceStub = () => ({ currentUser: { uid: {}, email: {} } });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserSelectorComponent],
      providers: [
        { provide: EmailSearcherService, useFactory: emailSearcherServiceStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`selectedUids has default value`, () => {
    expect(component.selectedUids).toEqual([]);
  });

  it(`authState has default value`, () => {
    expect(component.authState).toEqual(of(null));
  });

  it(`isLoadingItems has default value`, () => {
    expect(component.isLoadingItems).toEqual(true);
  });
});
