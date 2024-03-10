import { Component } from '@angular/core';
import { ShareModule } from '../../../../../shared/share.module';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { TuiBadgedContentComponent } from '@taiga-ui/kit';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  aceHole =
    'https://qph.cf2.quoracdn.net/main-qimg-1c75fec28dcae94eadff9cd7899ae5f5-lq';
  comments = [
    // create 10 objects with data to be displayed with name, kind, time
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
  ];
}
