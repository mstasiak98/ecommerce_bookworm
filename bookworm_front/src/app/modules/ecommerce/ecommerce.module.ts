import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookListSidebarComponent } from './components/book-list-sidebar/book-list-sidebar.component';
import { AccordionModule } from '../../lib/accordion/accordion.module';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
  },
];

@NgModule({
  declarations: [BookListComponent, BookListSidebarComponent],
  imports: [CommonModule, RouterModule.forChild(routes), AccordionModule],
})
export class EcommerceModule {}
