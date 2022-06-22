import { TestBed } from '@angular/core/testing';

import { CathegoryService } from './cathegory.service';

describe('CathegoryService', () => {
  let service: CathegoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CathegoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
