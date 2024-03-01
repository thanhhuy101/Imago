import { Component } from '@angular/core';
import { TaigaModule } from '../../shared/taiga.module';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TaigaModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly avatarUrl = `https://taiga-ui.dev/assets/images/avatar.jpg`;
  constructor(private authService: AuthService,private router: Router) {}

  login() {
    this.authService.signInWithGG();
  }

  loginWithGoogle() {
    this.router.navigate(['/register']).then();
  }
}
