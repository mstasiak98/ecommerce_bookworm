import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookListSidebarComponent } from './components/book-list-sidebar/book-list-sidebar.component';
import { AccordionModule } from '../../lib/accordion/accordion.module';
import { SliderModule } from 'primeng/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { TabMenuModule } from '../../lib/tab-menu/tab-menu.module';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SharedModule } from '../../shared/shared.module';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'order-history',
    component: OrdersHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-placed/:ref',
    component: OrderPlacedComponent,
  },
  {
    path: 'author/:name',
    component: BookListComponent,
  },
  {
    path: 'format/:id',
    component: BookListComponent,
  },
  {
    path: 'category/:id',
    component: BookListComponent,
  },
  {
    path: 'category',
    component: BookListComponent,
  },
  {
    path: 'details/:id',
    component: BookDetailsComponent,
  },

  {
    path: 'books',
    component: BookListComponent,
  },

  {
    path: 'cart',
    component: CartComponent,
  },

  {
    path: 'checkout',
    component: CheckoutComponent,
  },

  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/books',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    BookListComponent,
    BookListSidebarComponent,
    BookDetailsComponent,
    CartComponent,
    CheckoutComponent,
    OrderPlacedComponent,
    OrdersHistoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AccordionModule,
    SliderModule,
    FormsModule,
    PaginatorModule,
    TabMenuModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class EcommerceModule {}
