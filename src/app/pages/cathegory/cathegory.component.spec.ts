import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CathegoryComponent } from './cathegory.component';

describe('CathegoryComponent', () => {
  let component: CathegoryComponent;
  let fixture: ComponentFixture<CathegoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CathegoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CathegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
