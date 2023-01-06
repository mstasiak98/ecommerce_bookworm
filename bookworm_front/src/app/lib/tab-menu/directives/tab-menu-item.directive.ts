import { ContentChild, Directive, Input } from '@angular/core';
import { TabMenuContentDirective } from './tab-menu-content.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'tab-menu-item',
})
export class TabMenuItemDirective {
  @Input() title: string = '';
  @ContentChild(TabMenuContentDirective) content: TabMenuContentDirective;
}
