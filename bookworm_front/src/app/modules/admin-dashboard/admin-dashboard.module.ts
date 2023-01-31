import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from '../ecommerce/components/book-list/book-list.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CoreModule } from '../../core/core.module';
import { MenuModule } from 'primeng/menu';
import { AssignStateDialogComponent } from './components/assign-state-dialog/assign-state-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CountryDialogComponent } from './components/country-dialog/country-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminBookListComponent } from './components/admin-book-list/admin-book-list.component';
import { ChipModule } from 'primeng/chip';
import { AdminBookDetailsComponent } from './components/admin-book-details/admin-book-details.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DividerModule } from 'primeng/divider';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';
import { CustomerDialogComponent } from './components/customer-dialog/customer-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WidgetComponent } from './components/widget/widget.component';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'orders/:id',
        component: OrderDetailsComponent,
      },
      {
        path: 'archived-orders',
        component: OrdersListComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent,
      },
      {
        path: 'categories',
        component: CategoryListComponent,
      },
      {
        path: 'countries',
        component: CountryListComponent,
      },
      {
        path: 'books/:id',
        component: AdminBookDetailsComponent,
      },
      {
        path: 'books',
        component: AdminBookListComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminSidebarComponent,
    CountryListComponent,
    AssignStateDialogComponent,
    CountryDialogComponent,
    AdminBookListComponent,
    AdminBookDetailsComponent,
    CategoryListComponent,
    CategoryDialogComponent,
    BookDialogComponent,
    OrdersListComponent,
    OrderDetailsComponent,
    AddressDialogComponent,
    CustomerDialogComponent,
    DashboardComponent,
    WidgetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    CoreModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    ChipModule,
    InputSwitchModule,
    InputTextareaModule,
    DropdownModule,
    MultiSelectModule,
    DividerModule,
    ChartModule,
    ProgressSpinnerModule,
  ],
})
export class AdminDashboardModule {}
