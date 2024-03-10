import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TaigaModule } from '../../shared/taiga.module';
import { ShareModule } from '../../shared/share.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_TEXTFIELD_APPEARANCE_DIRECTIVE } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { ProfileState } from '../../../ngrx/profile/state/profile.state';
import { Store } from '@ngrx/store';
import * as ProfileActions from '../../../ngrx/profile/actions/profile.actions';
import { ProfileModel } from '../../model/profile.model';
import { Subscription } from 'rxjs';
import { AuthState } from '../../../ngrx/auth/auth.state';

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
  profile$ = this.store.select((state) => state.profile.profile);
  isSuccess$ = this.store.select('profile', 'isSuccess');
  errorMessage$ = this.store.select('profile', 'errorMessage');
  isGetAuthSuccess$ = this.store.select('auth', 'authCredential');

  id: string = '';
  email: string = '';
  userName: string = '';
  firstName: string = '';
  lastName: string = '';

  regisForm = new FormGroup({
    email: new FormControl(this.email),
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    isCheck: new FormControl(false, Validators.requiredTrue),
  });

  regisData = {
    email: this.email,
    userName: '',
    firstName: '',
    lastName: '',
  };

  constructor(
    private router: Router,
    private store: Store<{ profile: ProfileState; auth: AuthState }>,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.isGetAuthSuccess$.subscribe((authCredential) => {
        if (authCredential != undefined) {
          console.log(authCredential);
          this.id = authCredential.uid;
          this.email = authCredential.email;
        }
      }),
      this.profile$.subscribe((profile) => {
        if (profile) {
          console.log(profile);
          this.regisForm.patchValue({
            //id: this.id,
            email: this.email,
            userName: profile.userName,
            firstName: profile.firstName,
            lastName: profile.lastName,
          });
        }
      }),
      this.errorMessage$.subscribe((errorMessage) => {
        if (errorMessage) {
          console.log(errorMessage);
        }
      }),
      this.isSuccess$.subscribe((successMessage) => {
        if (successMessage) {
          //this.router.navigate(['/interest']).then();
          console.log(successMessage);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  register() {
    this.regisData = {
      email: this.email,
      userName: this.regisForm.value.userName ?? '',
      firstName: this.regisForm.value.firstName ?? '',
      lastName: this.regisForm.value.lastName ?? '',
    };
    this.store.dispatch(
      ProfileActions.createProfile({ profile: <ProfileModel>this.regisData }),
    );
    //navigate to interest page if create profile success
    this.router.navigate(['/interest']).then();
  }
}
