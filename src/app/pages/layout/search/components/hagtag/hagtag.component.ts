import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PostModel, PostResponse } from '../../../../../model/post.model';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReportModel } from '../../../../../model/report.model';
import * as ReportAction from '../../../../../../ngrx/report/report.actions';
import { Store } from '@ngrx/store';
import { ReportState } from '../../../../../../ngrx/report/report.state';
import { PostState } from '../../../../../../ngrx/post/post.state';
@Component({
  selector: 'app-hagtag',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './hagtag.component.html',
  styleUrl: './hagtag.component.scss'
})
export class HagtagComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
 
 isLiked = false;
 postList:PostResponse = { data: [], endPage: 0 };
 postList$ = this.store.select('post', 'postResponse');
 like() {
  this.isLiked = !this.isLiked;
}

postSearchResult$ = this.store.select((state) => state.post.postSearchResult);
list: PostModel[] = [];
  constructor(
    @Inject(TuiDialogService) private readonly dialogsDetail: TuiDialogService,
    @Inject(TuiDialogService) private readonly dialogsReport: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store<{
      post: PostState;
      report: ReportState;
    }>,
  ) { 
    this.subscription.push(
      this.postList$.subscribe((res) => {
        this.postList = res;
        console.log('search list',this.postList);
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.subscription.push(
      this.postSearchResult$.subscribe((res) => {
        this.list = res;
        console.log('search list',this.list);
      }),
    );
  }


  open = false;
  openUpdate = false;

  showDialog(i: any): void {
  
    this.open = true;
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
