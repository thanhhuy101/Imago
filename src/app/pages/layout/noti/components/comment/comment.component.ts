import { Component } from '@angular/core';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  listComment = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      avatar: '/assets/images/logo.png',
      content: 'Lorem Ipsum is simply dummy text of printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/assets/images/picture1.png',
      time: 11,
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      avatar: '/assets/images/logo.png',
      content: 'Lorem Ipsum is simply dummy text of printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/assets/images/picture2.png',
      time: 12,
    },

  ];
}
