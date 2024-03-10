import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { ShareModule } from '../../../../../shared/share.module';
import { TaigaModule } from '../../../../../shared/taiga.module';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss',
})
export class AllComponent {
  aceHole =
    'https://qph.cf2.quoracdn.net/main-qimg-1c75fec28dcae94eadff9cd7899ae5f5-lq';

  notifications = [
    {
      name: 'Monkey D. Luffy',
      time: '1 hour ago',
      kind: 'followed on you',
      icon: 'tuiIconUserCheck',
    },
    {
      name: 'Roronoa Zoro',
      time: '2 hours ago',
      kind: 'liked your post',
      icon: 'tuiIconThumbsUp',
    },
    {
      name: 'Nami',
      time: '3 hours ago',
      kind: 'commented on your post',
      icon: 'tuiIconMessageSquare',
    },
    {
      name: 'Usopp',
      time: '4 hours ago',
      kind: 'followed on you',
      icon: 'tuiIconUserCheck',
    },
    {
      name: 'Sanji',
      time: '5 hours ago',
      kind: 'liked your post',
      icon: 'tuiIconThumbsUp',
    },
    {
      name: 'Tony Tony Chopper',
      time: '6 hours ago',
      kind: 'commented on your post',
      icon: 'tuiIconMessageSquare',
    },
    {
      name: 'Nico Robin',
      time: '7 hours ago',
      kind: 'followed on you',
      icon: 'tuiIconUserCheck',
    },
    {
      name: 'Franky',
      time: '8 hours ago',
      kind: 'liked your post',
      icon: 'tuiIconThumbsUp',
    },
    {
      name: 'Brook',
      time: '9 hours ago',
      kind: 'commented on your post',
      icon: 'tuiIconMessageSquare',
    },
    {
      name: 'Jinbe',
      time: '10 hours ago',
      kind: 'followed on you',
      icon: 'tuiIconUserCheck',
    },
    {
      name: 'Trafalgar D. Water Law',
      time: '11 hours ago',
      kind: 'liked your post',
      icon: 'tuiIconThumbsUp',
    },
    {
      name: 'Basil Hawkins',
      time: '12 hours ago',
      kind: 'commented on your post',
      icon: 'tuiIconMessageSquare',
    },
    {
      name: 'Scratchmen Apoo',
      time: '13 hours ago',
      kind: 'followed on you',
      icon: 'tuiIconUserCheck',
    },
    {
      name: 'Eustass Kid',
      time: '14 hours ago',
      kind: 'liked your post',
      icon: 'tuiIconThumbsUp',
    },
  ];
}
