import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTabMenuContent]',
})
export class TabMenuContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
