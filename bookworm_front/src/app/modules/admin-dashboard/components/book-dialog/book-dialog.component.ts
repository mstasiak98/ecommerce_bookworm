import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category.service';
import { BookCategory } from '../../../../core/models/book-category';
import { BookService } from '../../../../shared/services/book.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Book } from '../../../../core/models/book';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
})
export class BookDialogComponent implements OnInit {
  form: FormGroup;
  categories: BookCategory[] = [];
  bookFormats: any[] = [
    { id: 1, formatName: 'Paperback' },
    { id: 2, formatName: 'Hardcover' },
    { id: 3, formatName: 'Kindle' },
  ];
  file: File;
  isEdit: boolean = false;
  book: Book;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private bookService: BookService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.config?.data?.book;
    this.listBookCategories();
    this.form = this.formBuilder.group({
      sku: ['', [Validators.required]],
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      pageCount: ['', [Validators.required]],
      categoryId: [[Validators.required]],
      description: ['', [Validators.required]],
      formatIds: ['', [Validators.required]],
    });

    if (this.isEdit) {
      this.book = this.config?.data?.book;
      this.insertEditData();
    }
  }

  private insertEditData(): void {
    this.form.patchValue({
      sku: this.book.sku,
      name: this.book.name,
      author: this.book.author,
      pageCount: this.book.pageCount,
      categoryId: this.book.category.id,
      description: this.book.description,
      formatIds: this.book.formats.map(format => format.format.id),
    });
  }

  private listBookCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('data', JSON.stringify(this.form.value));
    if (this.file && !this.isEdit) {
      formData.append('file', this.file);
    }

    let request = this.isEdit
      ? this.bookService.editBook(this.book.id, formData)
      : this.bookService.addBook(formData);

    request.subscribe({
      next: value => {
        this.toastService.showSuccessMessage(
          `Successfully ${this.isEdit ? 'edited' : 'added'} a book`
        );
        this.ref.close(value);
      },
      error: err => {
        this.toastService.showErrorMessage(err.message);
      },
    });
  }

  selectedFile(event: any) {
    this.file = event?.target?.files[0];
  }
}
