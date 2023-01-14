import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './modules/ecommerce/components/checkout/checkout.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/ecommerce/ecommerce.module').then(
        m => m.EcommerceModule
      ),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./modules/ecommerce/ecommerce.module').then(
        m => m.EcommerceModule
      ),
  },
  {
    path: '',
    redirectTo: '/shop/books',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
