import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../shared/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../../core/models/book';
import { BookFormatEnum } from '../../../../shared/enums/book-format-enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../../../../core/models/cart-item';
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  bookFormats = BookFormatEnum;
  options: { id: number; formatName: string }[] = [];

  book: Book;

  addToCartForm: FormGroup;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
    this.addToCartForm = this.formBuilder.group({
      bookFormat: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleBookDetails();
    });
  }

  private handleBookDetails(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookDetails(bookId).subscribe(data => {
      this.book = data;
      this.initBookFormats();
    });
  }

  private initBookFormats(): void {
    this.options = [
      ...this.book.formats.map(data => {
        return {
          id: +data.id.formatId,
          formatName: `${data.format.formatName} - ($${data.price})`,
        };
      }),
    ];
    this.addToCartForm.setValue({ bookFormat: this.options[0].id, amount: 1 });
  }

  addToCart() {
    console.log('test = ', this.addToCartForm.value);
    if (this.addToCartForm.invalid) return;
    const amount = this.addToCartForm.value.amount;
    const formatId = this.addToCartForm.value.bookFormat;
    const format = this.book.formats.find(
      x => Number(x.format.id) === Number(formatId)
    );

    console.log('format id = ', formatId);
    console.log('formats = ', this.book.formats);
    console.log('format = ', format);
    console.log('quantity = ', amount);
    if (!amount || !formatId || !format) return;
    console.log('test');

    const cartItem: CartItem = {
      id: this.book.id,
      name: this.book.name,
      author: this.book.author,
      quantity: amount,
      imageUrl: this.book.imageUrl,
      format: format.format,
      unitPrice: format.price,
    };

    this.cartService.addToCart(cartItem);
  }
}
