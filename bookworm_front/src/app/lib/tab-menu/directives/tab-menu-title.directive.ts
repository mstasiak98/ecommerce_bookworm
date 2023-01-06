import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTabMenuTitle]',
})
export class TabMenuTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
