import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {SEARCH_ROUTERS} from "./search/search/search.routers";

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
        path: 'noti',
        loadChildren: () =>
          import('./noti/noti.routes').then((m) => m.NOTI_ROUTERS),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.routers').then((m) => m.PROFILE_ROUTERS),
      },

      {
        path: 'search',
        loadChildren: () =>
          import('./search/search/search.routers').then((m) => m.SEARCH_ROUTERS),
      },

    ],
  },
];
