import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TUI_SANITIZER,
  TuiDialogModule,
  TuiAlertModule,
} from '@taiga-ui/core';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TaigaModule } from './shared/taiga.module';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from '../ngrx/auth/state/auth.state';

import * as AuthActions from '../ngrx/auth/actions/auth.actions';

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
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  ],
})
export class AppComponent {
  title = 'imago';

  constructor(
    private auth: Auth,
    private store: Store<{ auth: AuthState }>,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let idToken = await user.getIdToken(true);
        this.store.dispatch(AuthActions.storeToken({ token: idToken }));
        console.log(idToken);
      }
    });
  }
}
