import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from '../../../../shared/services/category.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { BookCategory } from '../../../../core/models/book-category';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  categoryName: string;
  existingCat: BookCategory;
  isEditMode: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const existingCategory = this.config.data.category;
    if (existingCategory) {
      this.existingCat = existingCategory;
      this.categoryName = this.existingCat.categoryName;
      this.isEditMode = true;
    }
  }

  submit(): void {
    if (!this.categoryName || this.categoryName.trim().length === 0) return;

    let request = this.isEditMode
      ? this.categoryService.editCategory(
          this.existingCat.id,
          this.categoryName
        )
      : this.categoryService.addCategory(this.categoryName);

    request.subscribe({
      next: resp => {
        this.toastService.showSuccessMessage(
          `Successfully ${this.isEditMode ? 'edited' : 'added'} category`
        );
        this.ref.close(resp);
      },
      error: err => {
        this.toastService.showErrorMessage(err.message);
      },
    });
  }
}
