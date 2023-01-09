import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelayedInputDirective } from './directives/delayed-input.directive';

@NgModule({
  declarations: [DelayedInputDirective],
  imports: [CommonModule],
  exports: [DelayedInputDirective],
})
export class DelayedInputModule {}
