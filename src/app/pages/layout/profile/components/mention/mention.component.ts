import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { TuiDialogService } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { PostState } from '../../../../../../ngrx/post/post.state';
import { PostModel } from '../../../../../model/post.model';
import * as PostActions from '../../../../../../ngrx/post/post.actions';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: 'mention.component.html',
  styleUrl: './mention.component.scss',
})
export class MentionComponent implements OnInit, OnDestroy {
  mentionList: PostModel[] = [];
  loader: boolean = false;
  subscription: Subscription[] = [];

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store<{
      post: PostState;
      auth: AuthState;
    }>,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
