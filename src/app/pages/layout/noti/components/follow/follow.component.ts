import { Component } from '@angular/core';
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [
    TuiButtonModule
  ],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.scss'
})
export class FollowComponent {
  listFollow = [
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
