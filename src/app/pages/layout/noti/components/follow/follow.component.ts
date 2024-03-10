import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.scss',
})
export class FollowComponent {
  aceHole =
    'https://qph.cf2.quoracdn.net/main-qimg-1c75fec28dcae94eadff9cd7899ae5f5-lq';

  follows = [
    // create 10 objects with data to be displayed with name, kind, time
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'started following you',
      time: '2 hours ago',
    },
  ];
}
