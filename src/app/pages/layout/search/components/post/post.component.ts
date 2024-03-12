import { Component, Inject } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PostState } from '../../../../../../ngrx/post/post.state';
import { ReportState } from '../../../../../../ngrx/report/report.state';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { PostModel } from '../../../../../model/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  subscription: Subscription[] = [];
  postSearchResult$ = this.store.select((state) => state.post.postSearchResult);
  list: PostModel[] = [];

  constructor(
    @Inject(TuiDialogService) private readonly dialogsReport: TuiDialogService,
    private readonly dialogsDetail: TuiDialogService,
    private store: Store<{
      post: PostState;
      auth: AuthState;
      report: ReportState;
    }>,
  ) {}

  index = 0;

  ngOnInit(): void {
    this.subscription.push(
      this.postSearchResult$.subscribe((res) => {
        this.list = res;
        console.log('search list',this.list);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  isLiked = false;

  like() {
    this.isLiked = !this.isLiked;
  }

  showDialogReport(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogsReport.open(content).subscribe();
  }

  showDialogDetail(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogsDetail.open(content, { size: 'auto' }).subscribe();
  }
  open = false;
  selectedItem: PostModel | null = null;

  openUpdate = false;

  showDialog(i: number): void {
    this.selectedItem = this.list[i];
    this.open = true;
  }
}
