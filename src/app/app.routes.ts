import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'event', loadComponent: () => import('./cartelera/pages/cards/cards.component').then(m => m.CardsComponent)
  },
  {
    path: 'event-detail/:id', loadComponent: () => import('./cartelera/pages/cards/card-details/card-details.component').then(m => m.CardDetailsComponent)
  },
  {
    path: '', redirectTo: 'event', pathMatch: 'full'
  }
];
