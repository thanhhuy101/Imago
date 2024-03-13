import { ProfileComponent } from './profile.component';
import { Routes } from '@angular/router';

export const PROFILE_ROUTERS: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full',
      },
      {
        path: 'post',
        loadComponent: () =>
          import('../profile/components/post/post.component').then(
            (m) => m.PostComponent,
          ),
      },
      {
        path: 'share',
        loadComponent: () =>
          import('../profile/components/share/share.component').then(
            (m) => m.ShareComponent,
          ),
      },
      {
        path: 'mention',
        loadComponent: () =>
          import('../profile/components/mention/mention.component').then(
            (m) => m.MentionComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full',
      },
    ],
  },
];
