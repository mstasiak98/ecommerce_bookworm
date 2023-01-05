import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { AccordionContentDirective } from './accordion-content.directive';
import { AccordionTitleDirective } from './accordion-title.directive';
import { AccordionHeaderDirective } from './accordion-header.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'accordion-item',
})
export class AccordionItemDirective {
  @Input() title = '';
  @Input() disabled = false;

  @ContentChild(AccordionContentDirective) content: AccordionContentDirective;
  @ContentChild(AccordionTitleDirective) customTitle: AccordionTitleDirective;
  @ContentChild(AccordionHeaderDirective)
  customHeader: AccordionHeaderDirective;

  constructor(public templateRef: TemplateRef<any>) {}
}
