import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TuiTabsModule } from '@taiga-ui/kit';
import { Router, RouterOutlet } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { TaigaModule } from '../../../../shared/taiga.module';
import { FormControl } from '@angular/forms';
import { ShareModule } from '../../../../shared/share.module';
import { Store } from '@ngrx/store';
import { PostState } from '../../../../../ngrx/post/post.state';
import { Subscription, debounceTime } from 'rxjs';
import * as PostActions from '../../../../../ngrx/post/post.actions';
import { PostModel } from '../../../../model/post.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgForOf, TuiTabsModule, RouterOutlet, TaigaModule, ShareModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
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
      text: 'category',
      router: '/category',
      icon: 'tuiIconCommand',
    },
  ];

  activeItemIndex = 0;
  searchValue = new FormControl();
  subscriptions: Subscription[] = [];
  isSearching = false;

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private route: Router,
    private store: Store<{ post: PostState }>,
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    let path = window.location.href.split('?')[0];
    // console.log(path);
    if (path.includes('search/people')) {
      this.activeItemIndex = 1;
    } else if (path.includes('search/category')) {
      this.activeItemIndex = 2;
    } else {
      this.activeItemIndex = 0;
    }

    this.subscriptions.push(
      this.searchValue.valueChanges
        .pipe(debounceTime(500))
        .subscribe((value) => {
          if (value == '') {
            this.store.dispatch(PostActions.search({ query: value }));
          } else {
            if (value?.includes('/')) {
              this.alerts.open(
                'Ký tự tìm kiếm không hợp lệ, vui lòng nhập ký tự khác',
                {
                  status: 'error',
                  autoClose: 3000,
                },
              );
            } else {
              this.store.dispatch(PostActions.search({ query: value }));
            }
          }
        }),
      this.store
        .select((state) => state.post.isSearching)
        .subscribe((res) => {
          this.isSearching = res;
       
        }),
    );
  }

  onActiveItemChange(index: number) {
    this.onChangePage(index);
  }

  onChangePage(i: number) {
    // console.log(this.items[i].router);
    this.route.navigate(['/search' + this.items[i].router]);
  }
  value = '';
}
