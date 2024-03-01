import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.LAYOUT_ROUTERS),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.routers').then((m) => m.LOGIN_ROUTERS),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.routers').then(
        (m) => m.REGISTER_ROUTERS,
      ),
  },
  {
    path: 'interest',
    loadChildren: () =>
      import('./pages/interest/interest.routers').then(
        (m) => m.INTEREST_ROUTERS,
      ),
  },
];
