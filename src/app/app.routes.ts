import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'currency', pathMatch: 'full' },
  {
    path: 'currency',
    loadComponent: () =>
      import('./feature/currency/currency.component').then(
        (c) => c.CurrencyComponent
      ),
  },
  {
    path: 'length',
    loadComponent: () =>
      import('./feature/length/length.component').then(
        (c) => c.LengthComponent
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
