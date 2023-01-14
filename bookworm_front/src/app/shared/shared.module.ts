import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinPricePipe } from './pipes/min-price';
import { MaxPricePipe } from './pipes/max-price.pipe';

@NgModule({
  declarations: [MinPricePipe, MaxPricePipe],
  imports: [CommonModule],
  exports: [MinPricePipe, MaxPricePipe],
})
export class SharedModule {}
