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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportModel } from '../../../../../model/report.model';
import { IdToAvatarPipe } from "../../../../../shared/pipes/id-to-avatar.pipe";
import { IdToNamePipe } from "../../../../../shared/pipes/id-to-name.pipe";

@Component({
    selector: 'app-post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    imports: [TaigaModule, ShareModule, IdToAvatarPipe, IdToNamePipe]
})
export class PostComponent {
  subscription: Subscription[] = [];
  postSearchResult$ = this.store.select((state) => state.post.postSearchResult);
  list: PostModel[] = [];
  commentValue = '';
  constructor(
    @Inject(TuiDialogService) private readonly dialogsReport: TuiDialogService,
    private readonly dialogsDetail: TuiDialogService,
    private store: Store<{
      post: PostState;
      auth: AuthState;
      report: ReportState;
    }>,
  ) {}
itemsCount = 0;
disabled=true;
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
    this.list = [];
  }

  comments =[
    {
      id: 1,
      name: 'Nguyễn Văn A',
      avatar: 'https://picsum.photos/200/300',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel.',
      date: '2021-11-11',
      like: 10,
      reply: 5,
      isLiked: false,
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      avatar: 'https://picsum.photos/200/300',
      content: '"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
      date: '2021-11-11',
      like: 10,
      reply: 5,
      isLiked: false,
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      avatar: 'https://picsum.photos/200/300',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel.',
      date: '2021-11-11',
      like: 10,
      reply: 5,
      isLiked: false,
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      avatar: 'https://picsum.photos/200/300',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel.',
      date: '2021-11-11',
      like: 10,
      reply: 5,
      isLiked: false,
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      avatar: 'https://picsum.photos/200/300',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel.',
      date: '2021-11-11',
      like: 10,
      reply: 5,
      isLiked: false,
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      avatar: 'https://picsum.photos/200/300',
      content: '"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
      date: '2021-11-11',
      like: 10,
      reply: 5,
      isLiked: false,
    },
  
  ]

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
  testForm = new FormGroup({
    testValue0: new FormControl(false),
    testValue1: new FormControl(false),
    testValue2: new FormControl(false),
    testValue3: new FormControl(false),
    testValue4: new FormControl(false),
    testValue5: new FormControl(false),
    testValue6: new FormControl(false),
    testValue7: new FormControl(false),
  });

  listReports = [
    'Hate speech',
    'Harassment',
    'Spam',
    'Fake news',
    'False information',
    'Violence',
    'Terrorism',
    'Nude',
  ];

  listChooses: string[] = [];

  checkBox(name: string) {
    this.listChooses.push(name);
    console.log(name);
  }

  testForm2 = new FormGroup({
    testValue1: new FormControl('', Validators.required),
  });

  submit(id: string) {
    let report: ReportModel = {
      type: 'post',
      reason: this.listChooses,
      typeId: id,
      content: this.testForm2.value.testValue1 as string,
      reporter: '',
    };
    this.listChooses = [];
 

    this.testForm2.patchValue({ testValue1: '' });
    this.testForm = new FormGroup({
      testValue0: new FormControl(false),
      testValue1: new FormControl(false),
      testValue2: new FormControl(false),
      testValue3: new FormControl(false),
      testValue4: new FormControl(false),
      testValue5: new FormControl(false),
      testValue6: new FormControl(false),
      testValue7: new FormControl(false),
    });
  }
}
