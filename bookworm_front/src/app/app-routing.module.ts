import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
