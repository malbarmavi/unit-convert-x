import { Routes } from '@angular/router';

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
    loadComponent: () =>
      import('./core/components/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  },
];
