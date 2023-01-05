import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { AccordionItemDirective } from './directives/accordion-item.directive';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  expanded = new Set<number>();
  @Input() collapsing = true;

  @ContentChildren(AccordionItemDirective)
  items: QueryList<AccordionItemDirective>;

  getToggleState(index: number) {
    return this.toggleState.bind(this, index);
  }

  toggleState(index: number) {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  }
}
