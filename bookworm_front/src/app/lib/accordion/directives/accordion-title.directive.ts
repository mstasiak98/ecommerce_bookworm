import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAccordionTitle]',
})
export class AccordionTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
