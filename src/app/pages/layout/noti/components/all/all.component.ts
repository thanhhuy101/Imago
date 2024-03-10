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
  notifications = [
    // generate notifications for testing about 20 items
    {
      name: 'John Doe',
      kind: 'followed on you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'followed on you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'followed on you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'followed on you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'followed on you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'followed on you',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'liked your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'commented on your post',
      time: '2 hours ago',
    },
    {
      name: 'John Doe',
      kind: 'followed on you',
      time: '2 hours ago',
    },
  ];

  viewNotification(index: any): void {
    console.log('view notification', index);
  }
}
