import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [NavbarComponent, BreadcrumbComponent],
  exports: [NavbarComponent, BreadcrumbComponent],
  imports: [CommonModule, InputTextModule, BadgeModule],
})
export class CoreModule {}
