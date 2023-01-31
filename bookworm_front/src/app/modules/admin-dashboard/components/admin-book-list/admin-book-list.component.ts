import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../shared/services/book.service';
import { Book } from '../../../../core/models/book';
import { DialogService } from 'primeng/dynamicdialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { of } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.scss'],
})
export class AdminBookListComponent implements OnInit {
  books: Book[] = [];
  totalRecords: number = 0;

  constructor(
    private bookService: BookService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.listBooks();
  }

  private listBooks(): void {
    this.bookService.getAllBooks(true).subscribe(data => {
      this.books = data;
      this.totalRecords = this.books.length;
    });
  }

  openNewBookDialog(): void {
    const ref = this.dialogService.open(BookDialogComponent, {
      header: `Add new book`,
      width: '30%',
    });

    ref.onClose.subscribe(data => {
      this.books.push(data);
      this.totalRecords++;
    });
  }

  deleteBook(book: Book): void {
    const action = book.deleted ? 'restore' : 'remove';

    this.confirmationService.confirm({
      header: `Are you sure you want to ${action} this book?`,
      accept: () => {
        this.bookService.deleteRestoreBook(book.id, book.deleted).subscribe({
          next: resp => {
            this.toastService.showSuccessMessage(
              `Book ${book.deleted ? 'restored' : 'deleted'} successfully}`
            );
            book.deleted = !book.deleted;
            let exiBookIdx = this.books.findIndex(x => (x.id = book.id))!;
            this.books[exiBookIdx] = book;
          },
          error: err => {
            console.log('err = ', err);
            this.toastService.showErrorMessage('Error while deleting book');
          },
        });
      },
    });
  }
}
