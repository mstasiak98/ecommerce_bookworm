import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookListSidebarComponent } from './components/book-list-sidebar/book-list-sidebar.component';
import { AccordionModule } from '../../lib/accordion/accordion.module';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { TabMenuModule } from '../../lib/tab-menu/tab-menu.module';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
  },
  {
    path: 'details',
    component: BookDetailsComponent,
  },
];

@NgModule({
  declarations: [
    BookListComponent,
    BookListSidebarComponent,
    BookDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AccordionModule,
    SliderModule,
    FormsModule,
    PaginatorModule,
    TabMenuModule,
  ],
})
export class EcommerceModule {}
