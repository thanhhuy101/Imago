import { Component } from '@angular/core';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [],
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss'
})
export class LikeComponent {
  listLike = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      avatar: '/assets/images/logo.png',
      time: 11,
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      avatar: '/assets/images/logo.png',
      time: 10,
    },
  ];
}
