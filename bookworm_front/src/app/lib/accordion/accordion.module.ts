import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { AccordionHeaderDirective } from './directives/accordion-header.directive';
import { AccordionTitleDirective } from './directives/accordion-title.directive';
import { AccordionContentDirective } from './directives/accordion-content.directive';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemDirective,
    AccordionHeaderDirective,
    AccordionTitleDirective,
    AccordionContentDirective,
  ],
  imports: [CommonModule],
  exports: [
    AccordionComponent,
    AccordionContentDirective,
    AccordionItemDirective,
    AccordionHeaderDirective,
    AccordionTitleDirective,
  ],
})
export class AccordionModule {}
