import { Component } from '@angular/core';
import { TaigaModule } from '../../shared/modules/taiga.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TaigaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly avatarUrl = `https://taiga-ui.dev/assets/images/avatar.jpg`;
}
