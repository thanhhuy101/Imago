import { Component } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss',
})
export class LikeComponent {
  aceHole =
    'https://qph.cf2.quoracdn.net/main-qimg-1c75fec28dcae94eadff9cd7899ae5f5-lq';

  likes = [
    // create 10 objects with data to be displayed with name, kind, time
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
  ];
}
