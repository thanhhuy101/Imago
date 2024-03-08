import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
export class RegisterComponent implements OnInit {
  regisForm = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    isCheck: new FormControl(false, Validators.requiredTrue),
  });

  subscription: Subscription[] = [];
  profile$ = this.store.select((state) => state.profile.profile);
  isCreateSuccess$ = this.store.select(
    (state) => state.profile.isCreateProfileSuccess,
  );
  isCreateFailure$ = this.store.select(
    (state) => state.profile.createProfileErrorMessage,
  );

  constructor(
    private router: Router,
    private store: Store<{ profile: ProfileState; auth: AuthState }>,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('auth', 'token').subscribe((token) => {
        if (token != '' && token != undefined) {
          this.store.dispatch(ProfileActions.getProfile({ token: token }));
        }
      }),
    );
    this.isCreateSuccess$.subscribe((isCreateProfileSuccess) => {
      if (isCreateProfileSuccess) {
        this.router.navigate(['/interest']).then();
      }
    });
    this.isCreateFailure$.subscribe((createProfileErrorMessage) => {
      if (createProfileErrorMessage) {
        console.log(createProfileErrorMessage);
      }
    });
  }

  register() {
    let newForm: any = {
      email: this.regisForm.value.email,
      userName: this.regisForm.value.userName || '',
      firstName: this.regisForm.value.firstName || '',
      lastName: this.regisForm.value.lastName || '',
    };
    this.store.dispatch(ProfileActions.createProfile(newForm));
  }
}
