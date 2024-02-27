import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const LAYOUT_ROUTERS: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.routers').then((m) => m.HOME_ROUTERS),
      },
      {
        path: 'creator',
        loadChildren: () =>
          import('./creator/creator.routers').then((m) => m.CREATOR_ROUTERS),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.routers').then((m) => m.PROFILE_ROUTERS),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.routers').then((m) => m.SEARCH_ROUTERS),
      },
    ],
  },
];
