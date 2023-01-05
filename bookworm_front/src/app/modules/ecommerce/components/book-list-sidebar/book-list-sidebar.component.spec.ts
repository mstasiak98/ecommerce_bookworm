import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListSidebarComponent } from './book-list-sidebar.component';

describe('BookListSidebarComponent', () => {
  let component: BookListSidebarComponent;
  let fixture: ComponentFixture<BookListSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
