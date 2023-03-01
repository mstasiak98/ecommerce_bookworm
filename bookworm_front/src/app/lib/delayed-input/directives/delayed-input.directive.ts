import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounce, fromEvent, Subject, takeUntil, timer } from 'rxjs';

@Directive({
  selector: '[appDelayedInput]',
})
export class DelayedInputDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() delayTime = 500;
  @Output() delayedInput = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit() {
    fromEvent(this.elementRef.nativeElement, 'input')
      .pipe(
        debounce(() => timer(this.delayTime)),
        takeUntil(this.destroy$)
      )
      .subscribe(e => this.delayedInput.emit(e));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
