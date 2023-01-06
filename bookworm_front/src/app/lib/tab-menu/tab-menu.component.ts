import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabMenuItemDirective } from './directives/tab-menu-item.directive';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
  animations: [
    trigger('contentExpansion', [
      state(
        'expanded',
        style({ height: '*', opacity: 1, visibility: 'visible' })
      ),
      state(
        'collapsed',
        style({ height: '0px', opacity: 0, visibility: 'hidden' })
      ),
      transition('expanded <=> collapsed', animate('10ms linear')),
    ]),
  ],
})
export class TabMenuComponent implements OnInit {
  @ContentChildren(TabMenuItemDirective)
  items: QueryList<TabMenuItemDirective>;

  activeTab: number = 0;

  constructor() {}

  ngOnInit(): void {}

  toggleTab(index: number) {
    console.log('toggle komponent = ', index);
    if (this.activeTab === index || index > this.items.length) return;
    this.activeTab = index;
  }
}
