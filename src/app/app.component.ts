import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TUI_SANITIZER, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TaigaModule } from './shared/taiga.module';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TaigaModule, TuiDialogModule, TuiAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
})
export class AppComponent {
  title = 'imago';
  constructor(
    private auth: Auth,
    private router: Router,
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('user is sign in');

        this.router.navigate(['/register']);
        // ...
      } else {
        // User is signed out
        // ...
        console.log('user is sign out');
        this.router.navigate(['/login']);
      }
    });
  }
}
