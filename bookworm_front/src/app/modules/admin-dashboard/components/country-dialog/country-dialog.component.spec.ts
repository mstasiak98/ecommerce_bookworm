import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDialogComponent } from './country-dialog.component';

describe('CountryDialogComponent', () => {
  let component: CountryDialogComponent;
  let fixture: ComponentFixture<CountryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
