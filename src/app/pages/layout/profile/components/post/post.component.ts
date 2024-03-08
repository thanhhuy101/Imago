import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';
import { mergeMap, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { PostState } from '../../../../../../ngrx/post/post.state';
import { PostModel } from '../../../../../model/post.model';
import * as PostActions from '../../../../../../ngrx/post/post.action';
import {routes} from "../../../../../app.routes";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [TaigaModule, ShareModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit, OnDestroy {
  loader: boolean = false;
  subscription: Subscription[] = [];
  token$ = this.store.select('auth', 'token');
  postList$ = this.store.select('post', 'list');
  loading$ = this.store.select('post', 'loading');
  success$ = this.store.select('post', 'isGetMineSucces');
  failure$ = this.store.select('post', 'error');
  list: PostModel[] = [];
  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store<{
      post: PostState;
      auth: AuthState;
    }>,
  ) {}
  index = 0;
  ngOnInit(): void {
    this.subscription.push(
      this.token$.subscribe((token) => {
        if (token) {
          this.store.dispatch(PostActions.getMine({ page: 1, size: 10 }));
        }
      }),
      this.loading$.subscribe((res) => {
        if (res) {
          this.loader = true;
        }
      }),
      this.success$
        .pipe(
          mergeMap((res) => {
            if (res) {
              return this.postList$;
            }
            return [];
          }),
        )
        .subscribe((res) => {
          if (res) {
            this.loader = false;
            this.list = res.data;
          }
        }),
      this.failure$.subscribe((res) => {
        if (res) {
          this.loader = false;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  // showDialog(i: any): void {
  //   this.selectedItem = this.list[i]
  //   this.open = true;

  // }
  protected readonly routes = routes;
}
