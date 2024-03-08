import { Routes } from '@angular/router';
import { SearchComponent } from './search.component';

export const SEARCH_ROUTERS: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: 'post',
        loadComponent: () =>
          import('../search/search-components/post/post.component').then(
            (m) => m.PostComponent,
          ),
      },
      {
        path: 'people',
        loadComponent: () =>
          import('../search/search-components/people/people.component').then(
            (m) => m.PeopleComponent,
          ),
      },
      {
        path: 'group',
        loadComponent: () =>
          import('../search/search-components/group/group.component').then(
            (m) => m.GroupComponent,
          ),
      },
      {
        path: 'explore',
        loadComponent: () =>
          import('../search/search-components/explore/explore.component').then(
            (m) => m.ExploreComponent,
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
