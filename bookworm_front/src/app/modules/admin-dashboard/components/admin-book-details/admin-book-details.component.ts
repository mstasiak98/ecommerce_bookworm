import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../../shared/services/book.service';
import { Book } from '../../../../core/models/book';
import { DialogService } from 'primeng/dynamicdialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { finalize, Observable, of, tap } from 'rxjs';
import { BookFormat } from '../../../../core/models/book-format';
import { Resource } from '@angular/compiler-cli/src/ngtsc/metadata';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getDomElements } from '@angular-eslint/eslint-plugin-template/dist/eslint-plugin-template/src/utils/get-dom-elements';
import { ToastService } from '../../../../shared/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { BookFormData } from '../../../../core/models/book-form-data';

@Component({
  selector: 'app-admin-book-details',
  templateUrl: './admin-book-details.component.html',
  styleUrls: ['./admin-book-details.component.scss'],
})
export class AdminBookDetailsComponent implements OnInit {
  book: Book;
  file: File;
  isFileUploading: boolean = false;
  quantity: number;
  price: number;
  editMode: boolean = false;
  selected: any = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getBookDetails();
    });
  }

  private getBookDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookDetails(+id).subscribe(data => {
        this.book = data;
      });
    }
    return;
  }

  openEditDialog() {
    const ref = this.dialogService.open(BookDialogComponent, {
      header: `Edit book details`,
      width: '30%',
      data: {
        book: this.book,
      },
    });
    ref.onClose.subscribe(data => {
      this.book = data;
      this.book.formats = data.formats;
    });
  }

  changedCoverFile(event: any) {
    this.file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.file);
    this.isFileUploading = true;
    this.bookService
      .changeCover(this.book.id, formData)
      .pipe(
        finalize(() => {
          this.isFileUploading = false;
        })
      )
      .subscribe({
        next: resp => {
          this.book.imageUrl = resp.response;
        },
        error: err => {
          this.toastService.showErrorMessage(err.message);
        },
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
            this.book = book;
          },
          error: err => {
            console.log('err = ', err);
            this.toastService.showErrorMessage('Error while deleting book');
          },
        });
      },
    });
  }

  toggleEditMode(format: BookFormat, idx: number): void {
    if (this.selected === idx) this.selected = -1;
    else this.selected = idx;
    this.quantity = format.quantity;
    this.price = format.price;
  }
  editBookFormat(format: BookFormat, idx: number) {
    if (!(this.quantity > 0 && this.price > 0)) return;

    const bookFormatData: BookFormData = {
      id: format.id,
      quantity: this.quantity,
      price: this.price,
    };

    this.bookService.setFormatParams(bookFormatData).subscribe({
      next: value => {
        this.toastService.showSuccessMessage('Parameters changed');
        const formatIdx = this.book.formats.findIndex(
          x => x.id.formatId === value.id.formatId
        );
        this.book.formats[formatIdx] = value;
      },
      error: err => {
        this.toastService.showErrorMessage('Error while assigning parameters');
      },
      complete: () => {
        this.toggleEditMode(format, idx);
      },
    });
  }
}
