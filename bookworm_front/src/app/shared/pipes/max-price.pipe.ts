import { Pipe, PipeTransform } from '@angular/core';
import { BookFormat } from '../../core/models/book-format';

@Pipe({
  name: 'maxPrice',
})
export class MaxPricePipe implements PipeTransform {
  transform(data: BookFormat[]): number {
    return data.reduce((prev, current) =>
      prev.price > current.price ? prev : current
    ).price;
  }
}
