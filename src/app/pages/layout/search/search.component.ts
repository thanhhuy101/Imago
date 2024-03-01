import { Component, Inject, OnInit } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TaigaModule, ShareModule, RouterOutlet],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  readonly items = [
    {
      text: 'Post',
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
      icon: 'tuiIconCompass',
    },
  ];
  activeItemIndex = 0;

  searchValue = new FormControl();
  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private route: Router,
  ) {}
  ngOnInit(): void {
    // let path = window.location.href.split('?')[0];
    // console.log(path);
    // if (path.includes('search/people')) {
    //   this.activeItemIndex = 1;
    // } else if (path.includes('search/group')) {
    //   this.activeItemIndex = 2;
    // } else if (path.includes('search/explore')) {
    //   this.activeItemIndex = 3;
    // } else {
    //   this.activeItemIndex = 0;
    // }
  }
  onActiveItemChange(index: number) {
    this.onChangePage(index);
  }

  onChangePage(i: number) {
    this.route.navigate(['/search' + this.items[i].router]);
  }
}
