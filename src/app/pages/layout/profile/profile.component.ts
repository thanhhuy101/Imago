import { Component, Inject, OnInit } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { TuiAlertService } from '@taiga-ui/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../../ngrx/profile/state/profile.state';
import * as ProfileActions from '../../../../ngrx/profile/actions/profile.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TaigaModule, ShareModule, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  readonly items = [
    {
      text: 'post',
      router: '/post',
    },
    {
      text: 'Share',
      router: '/share',
    },
    {
      text: 'Mention',
      router: '/mention',
    },
  ];

  activeItemIndex = 0;
  $profile = this.store.select((state) => state.profile.profile);

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private route: Router,
    private store: Store<{ profile: ProfileState }>,
  ) {
    let path = window.location.href.split('?')[0];
    console.log(path);
    if (path.includes('profile/share')) {
      this.activeItemIndex = 1;
    } else if (path.includes('profile/mention')) {
      this.activeItemIndex = 2;
    }
  }
  ngOnInit(): void {
    this.store.dispatch(ProfileActions.getProfile({ id: '' }));
  }

  onActiveItemChange(index: number) {
    this.onChangePage(index);
  }

  onChangePage(i: number) {
    console.log(this.items[i].router);
    this.route.navigate(['/profile' + this.items[i].router]);
  }
}
