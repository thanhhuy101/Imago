import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ShareModule } from '../../../shared/share.module';
import { TaigaModule } from '../../../shared/taiga.module';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiSizeL,
  TuiSizeS,
} from '@taiga-ui/core';
import { TuiDataListDropdownManagerModule } from '@taiga-ui/kit';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostState } from '../../../../ngrx/post/post.state';
import { Store } from '@ngrx/store';
import * as PostActions from '../../../../ngrx/post/post.action';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { ReportState } from '../../../../ngrx/report/report.state';
import { ReportModel } from '../../../model/report.model';
import * as ReportAction from '../../../../ngrx/report/report.action';
import { Subscription } from 'rxjs';
import { ImagesCarouselComponent } from '../creator/components/images-carousel/images-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ShareModule,
    TaigaModule,
    TuiDataListDropdownManagerModule,
    ImagesCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  postList$ = this.store.select((state) => state.post.postList);

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
      this.store.select('auth', 'token').subscribe((token) => {
        if (token != '') {
          this.store.dispatch(PostActions.getAllPost({ token: token }));
        }
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
    this.subscription.push(
      this.store.select('auth', 'token').subscribe((token) => {
        if (token != '') {
          this.store.dispatch(
            ReportAction.createReport({ token: token, report }),
          );
        }
      }),
    );

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
