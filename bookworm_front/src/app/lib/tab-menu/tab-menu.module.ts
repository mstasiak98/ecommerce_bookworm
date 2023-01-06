import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuComponent } from './tab-menu.component';
import { TabMenuContentDirective } from './directives/tab-menu-content.directive';
import { TabMenuTitleDirective } from './directives/tab-menu-title.directive';
import { TabMenuItemDirective } from './directives/tab-menu-item.directive';

@NgModule({
  declarations: [
    TabMenuComponent,
    TabMenuContentDirective,
    TabMenuTitleDirective,
    TabMenuItemDirective,
  ],
  imports: [CommonModule],
  exports: [TabMenuContentDirective, TabMenuItemDirective, TabMenuComponent],
})
export class TabMenuModule {}
