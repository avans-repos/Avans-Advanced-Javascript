import { TestBed } from '@angular/core/testing';

import { EmailSearcherService } from './email-searcher.service';

describe('EmailSearcherService', () => {
  let service: EmailSearcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSearcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
