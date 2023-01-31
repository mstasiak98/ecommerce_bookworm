import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStateDialogComponent } from './assign-state-dialog.component';

describe('AssignStateDialogComponent', () => {
  let component: AssignStateDialogComponent;
  let fixture: ComponentFixture<AssignStateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignStateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
