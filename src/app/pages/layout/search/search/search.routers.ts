import { SearchComponent } from './search.component';
import { Routes } from '@angular/router';

export const SEARCH_ROUTERS: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: 'post',
        loadComponent: () => import('../components/post/post.component').then((m) => m.PostComponent),
      },
      {
        path: 'people',
        loadComponent: () => import('../components/people/people.component').then((m) => m.PeopleComponent),
      },
      {
        path: 'group',
        loadComponent: () => import('../components/group/group.component').then((m) => m.GroupComponent),
      },
      {
        path: 'explore',
        loadComponent: () => import('../components/explore/explore.component').then((m) => m.ExploreComponent),
      }

    ]
  }
];
