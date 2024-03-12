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
        path: 'category',
        loadComponent: () => import('../components/hagtag/hagtag.component').then((m) => m.HagtagComponent),
      },
     
      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full'
      }

    ]
  }
];
