import { Routes } from '@angular/router';
import {NotiComponent} from "./noti.component";

export const NOTI_ROUTERS: Routes = [
  {
    path: '',
    component: NotiComponent,
    children: [
      {
        path: 'all',
        loadComponent: () => import('../noti/components/all/all.component').then((m) => m.AllComponent),
      },
      {
        path: 'like',
        loadComponent: () => import('../noti/components/like/like.component').then((m) => m.LikeComponent),
      },
      {
        path: 'comment',
        loadComponent: () => import('../noti/components/comment/comment.component').then((m) => m.CommentComponent),
      },
      {
        path: 'follow',
        loadComponent: () => import('../noti/components/follow/follow.component').then((m) => m.FollowComponent),
      }
    ]
  },
];
