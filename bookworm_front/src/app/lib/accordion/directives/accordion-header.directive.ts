import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAccordionHeader]',
})
export class AccordionHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
