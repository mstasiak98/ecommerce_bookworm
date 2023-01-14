import { Pipe, PipeTransform } from '@angular/core';
import { BookFormat } from '../../core/models/book-format';

@Pipe({
  name: 'minPrice',
})
export class MinPricePipe implements PipeTransform {
  transform(data: BookFormat[]): number {
    return data.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    ).price;
  }
}
