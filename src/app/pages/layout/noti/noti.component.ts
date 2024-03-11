import { Component, Inject } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { Router, RouterOutlet } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-noti',
  standalone: true,
  imports: [TaigaModule, ShareModule, RouterOutlet],
  templateUrl: './noti.component.html',
  styleUrl: './noti.component.scss',
})
export class NotiComponent {
  readonly items = [
    {
      text: 'All',
      router: '/all',
    },
    {
      text: 'Like',
      router: '/like',
    },
    {
      text: 'Comment',
      router: '/comment',
    },
    {
      text: 'Follow',
      router: '/follow',
    },
  ];

  activeItemIndex = 0;

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router,
  ) {
    if (this.router.url.includes('/all')) {
      this.activeItemIndex = 0;
    }
    if (this.router.url.includes('/like')) {
      this.activeItemIndex = 1;
    }
    if (this.router.url.includes('/comment')) {
      this.activeItemIndex = 2;
    }
    if (this.router.url.includes('/follow')) {
      this.activeItemIndex = 3;
    }
  }

  onActiveItemChange(index: number) {
    this.onChangePage(index);
  }

  onChangePage(i: number) {
    this.router.navigate(['/notification' + this.items[i].router]);
  }
}
