import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TUI_SANITIZER } from '@taiga-ui/core';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TaigaModule } from './shared/taiga.module';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrx/auth/auth.state';

import * as AuthActions from '../ngrx/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TaigaModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent implements OnInit {
  uid = '';

  token$ = this.store.select('auth', 'token');

  isGetAuthSuccess$ = this.store.select('auth', 'authCredential');
  getAuthErrorResponse$ = this.store.select('auth', 'getAuthErrorResponse');

  isSignUpSuccess$ = this.store.select('auth', 'isSignUpSuccess');

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState }>,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let idToken = await user.getIdToken(true);
        this.uid = user.uid;

        this.store.dispatch(AuthActions.storeToken({ token: idToken }));
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
      }
    });

    this.isGetAuthSuccess$.subscribe((authCredential) => {
      if (authCredential.email) {
        // this.router.navigate(['/register']).then();
      }
    });
    this.getAuthErrorResponse$.subscribe((error) => {
      if (error.status === 404) {
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
