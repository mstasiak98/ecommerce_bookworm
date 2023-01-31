import { Component, Input, OnInit } from '@angular/core';
import { Widget } from '../../../../core/models/widget';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit {
  @Input() widgetInfo: Widget;

  constructor() {}

  ngOnInit(): void {
    console.log('test');
  }
}
