import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss'],
})
export class OrderPlacedComponent implements OnInit {
  trackingNumber: string;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('ref');
    if (!ref) {
      return;
    }
    this.trackingNumber = ref;
  }
}
