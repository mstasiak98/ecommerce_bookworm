import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  links: any = [{ label: 'Book details', link: '' }];

  activeRoutes: any[];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log('ev', event);
        this.setActiveRoutes(event.url);
      }
    });
  }

  private setActiveRoutes(url: string): void {
    if (url.includes('countries')) {
      this.activeRoutes = [{ label: 'Delivery countries', link: 'countries' }];
    }

    if (url.includes('categories')) {
      this.activeRoutes = [{ label: 'Book categories', link: 'categories' }];
    }

    if (url.includes('books') && !url.includes('books/')) {
      this.activeRoutes = [{ label: 'Book list', link: 'books' }];
    }

    if (url.includes('orders') && !url.includes('orders/')) {
      this.activeRoutes = [{ label: 'Orders', link: 'orders' }];
    }

    if (url.includes('archived-orders') && !url.includes('orders')) {
      this.activeRoutes = [
        { label: 'Archived orders', link: 'archived-orders' },
      ];
    }

    if (url.includes('orders/')) {
      this.activeRoutes = [
        { label: 'Orders', link: 'orders' },
        { label: 'Order details' },
      ];
    }

    if (url.includes('books/')) {
      this.activeRoutes = [
        { label: 'Book list', link: 'books' },
        { label: 'Book details' },
      ];
    }
    if (url.includes('dashboard')) {
      this.activeRoutes = [];
    }
  }
  ngOnInit(): void {}
}
