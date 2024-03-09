import { Component, Inject } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TuiTabsModule } from '@taiga-ui/kit';
import { Router, RouterOutlet } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { TaigaModule } from '../../../../shared/taiga.module';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgForOf, TuiTabsModule, RouterOutlet, TaigaModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  readonly items = [
    {
      text: 'post',
      router: '/post',
      icon: 'tuiIconFileText',
    },
    {
      text: 'People',
      router: '/people',
      icon: 'tuiIconUser',
    },
    {
      text: 'Group',
      router: '/group',
      icon: 'tuiIconUsers',
    },

    {
      text: 'Explore',
      router: '/explore',
      icon: 'tuiIconCompassLarge',
    },
  ];

  activeItemIndex = 0;

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private route: Router,
  ) {
    let path = window.location.href.split('?')[0];
    console.log(path);
    if (path.includes('search/people')) {
      this.activeItemIndex = 1;
    } else if (path.includes('search/group')) {
      this.activeItemIndex = 2;
    } else if (path.includes('search/explore')) {
      this.activeItemIndex = 3;
    } else {
      this.activeItemIndex = 0;
    }
  }

  onActiveItemChange(index: number) {
    this.onChangePage(index);
  }

  onChangePage(i: number) {
    console.log(this.items[i].router);
    this.route.navigate(['/search' + this.items[i].router]);
  }
}
