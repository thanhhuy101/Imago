import { Component } from '@angular/core';
import { TaigaModule } from '../../shared/taiga.module';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TaigaModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly googleIcon = '../../../assets/images/google.png';

  constructor(private router: Router) {}

  loginWithGoogle() {
    this.router.navigate(['/register']).then();
  }
}
