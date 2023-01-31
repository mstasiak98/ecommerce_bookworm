import { Component, OnInit } from '@angular/core';
import { BookCategory } from '../../../../core/models/book-category';
import { CategoryService } from '../../../../shared/services/category.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastService } from '../../../../shared/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: BookCategory[] = [];
  constructor(
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listCategories();
  }

  private listCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  openNewCategoryDialog(category?: BookCategory) {
    const ref = this.dialogService.open(CategoryDialogComponent, {
      header: `${category ? 'Edit category' : 'Create new category'}`,
      width: '30%',
      data: {
        category: category,
      },
    });

    ref.onClose.subscribe(data => {
      const existingCatIdx = this.categories.findIndex(x => x.id === data.id);
      if (existingCatIdx > 0) {
        this.categories[existingCatIdx] = data;
      } else {
        this.categories.push(data);
      }
    });
  }

  deleteCategory(categoryId: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this category?',
      accept: () => {
        this.categoryService.removeCategory(categoryId).subscribe({
          next: value => {
            this.toastService.showSuccessMessage(
              'Successfully deleted category'
            );
            this.categories = this.categories.filter(x => x.id !== categoryId);
          },
          error: err => {
            console.log('err = ', err);
            this.toastService.showErrorMessage(err.message);
          },
        });
      },
    });
  }
}
