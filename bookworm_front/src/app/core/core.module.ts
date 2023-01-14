import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { DelayedInputModule } from '../lib/delayed-input/delayed-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

@NgModule({
  declarations: [
    NavbarComponent,
    BreadcrumbComponent,
    FooterComponent,
    CartStatusComponent,
  ],
  exports: [NavbarComponent, BreadcrumbComponent, FooterComponent],
  imports: [
    CommonModule,
    InputTextModule,
    BadgeModule,
    SidebarModule,
    RouterModule,
    DelayedInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CoreModule {}
