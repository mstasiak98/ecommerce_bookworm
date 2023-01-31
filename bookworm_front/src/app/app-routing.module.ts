import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './modules/ecommerce/components/checkout/checkout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./modules/ecommerce/ecommerce.module').then(
        m => m.EcommerceModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin-dashboard/admin-dashboard.module').then(
        m => m.AdminDashboardModule
      ),
    canActivate: [AuthGuard, AdminGuard],
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
