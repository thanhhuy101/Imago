import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TaigaModule } from '../../shared/taiga.module';
import { ShareModule } from '../../shared/share.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_TEXTFIELD_APPEARANCE_DIRECTIVE } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import { Store } from '@ngrx/store';
import * as ProfileActions from '../../../ngrx/profile/profile.actions';
import { ProfileModel } from '../../model/profile.model';
import { Subscription } from 'rxjs';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TUI_TEXTFIELD_APPEARANCE_DIRECTIVE,
      useValue: {
        appearance: 'material-textfield',
      },
    },
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  loader = false;

  regisForm = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    isCheck: new FormControl(false, Validators.requiredTrue),
    photoURL: new FormControl(''),
  });

  regisData: ProfileModel = {
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
    id: '',
    bio: '',
    photoUrl: '',
    followers: [],
    following: [],
    phone: '',
    gender: '',
    category: [],
  };

  firebaseData$ = this.store.select('auth', 'firebaseData');

  isCreating$ = this.store.select('profile', 'isCreating');
  isCreateSuccess$ = this.store.select('profile', 'isCreateSuccess');
  createErrorMessage$ = this.store.select('profile', 'createErrorMessage');

  constructor(
    private router: Router,
    private store: Store<{ profile: ProfileState; auth: AuthState }>,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.firebaseData$.subscribe((data) => {
        if (data.uid) {
          this.regisForm.patchValue({
            email: data.email,
            photoURL: data.photoURL,
          });
        }
      }),

      this.isCreating$.subscribe((isCreating) => {
        this.loader = isCreating;
      }),
      this.isCreateSuccess$.subscribe((isCreateSuccess) => {
        if (isCreateSuccess) {
          this.notification.successNotification('Register Success');
          this.router.navigate(['/interest']).then();
        }
      }),
      this.createErrorMessage$.subscribe((error) => {
        if (error.status) {
          this.notification.errorNotification('Register Failed');
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  register() {
    this.regisData = {
      email: this.regisForm.value.email ?? '',
      userName: this.regisForm.value.userName ?? '',
      firstName: this.regisForm.value.firstName ?? '',
      lastName: this.regisForm.value.lastName ?? '',
      id: '',
      bio: '',
      photoUrl: this.regisForm.value.photoURL ?? '',
      followers: [],
      following: [],
      phone: '',
      gender: '',
      category: [],
    };

    this.store.dispatch(ProfileActions.createMine({ profile: this.regisData }));
  }
}
