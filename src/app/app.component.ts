import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TUI_SANITIZER,
  TuiDialogModule,
  TuiAlertModule,
} from '@taiga-ui/core';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TaigaModule } from './shared/taiga.module';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrx/auth/auth.state';

import * as AuthActions from '../ngrx/auth/auth.actions';
import * as ProfileActions from '../ngrx/profile/profile.actions';

import { FirebaseDataModel } from './model/auth.model';
import { ProfileState } from '../ngrx/profile/profile.state';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TuiRootModule,
    TaigaModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent implements OnInit {
  uid = '';

  token$ = this.store.select('auth', 'token');

  isGetAuthSuccess$ = this.store.select('auth', 'authCredential');
  getAuthErrorResponse$ = this.store.select('auth', 'getAuthErrorResponse');

  isGetProfileSuccess$ = this.store.select('profile', 'profile');

  isSignUpSuccess$ = this.store.select('auth', 'isSignUpSuccess');

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState; profile: ProfileState }>,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let idToken = await user.getIdToken(true);
        this.uid = user.uid;

        let firebaseData: FirebaseDataModel = {
          uid: user.uid,
          email: user.email || '',
          photoURL: user.photoURL || '',
        };

        this.store.dispatch(AuthActions.storeToken({ token: idToken }));
        this.store.dispatch(AuthActions.storeFirebaseData({ firebaseData }));
      } else {
        this.router.navigate(['/login']).then();
      }
    });
  }

  ngOnInit(): void {
    this.token$.subscribe((token) => {
      if (token) {
        console.log(token);
        this.store.dispatch(AuthActions.getAuth({ id: this.uid }));
        this.store.dispatch(ProfileActions.getById({ id: this.uid }));
      }
    });

    combineLatest([
      this.isGetAuthSuccess$,
      this.isGetProfileSuccess$,
      this.getAuthErrorResponse$,
    ]).subscribe(([authCredential, profile, error]) => {
      const { email: authEmail } = authCredential;
      const { email: profileEmail, category } = profile;

      if (authEmail && profileEmail) {
        if (category.length !== 0) {
          const isAuthRoute = ['/login', '/register', '/interest'].includes(
            this.router.url,
          );
          const route = isAuthRoute ? '/home' : this.router.url;
          console.log(isAuthRoute ? 'home' : 'reload');
          this.router.navigate([route]).then();
        } else {
          console.log('interest');
          this.router.navigate(['/interest']).then();
        }
      } else if (authEmail && !profileEmail) {
        console.log('register');
        this.router.navigate(['/register']).then();
      } else if (error.status === 404) {
        this.store.dispatch(AuthActions.signUp());
      }
    });

    this.isSignUpSuccess$.subscribe((isSignUpSuccess) => {
      if (isSignUpSuccess) {
        this.router.navigate(['/register']).then();
      }
    });
  }
}
