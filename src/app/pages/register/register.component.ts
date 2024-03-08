import { Component, ViewEncapsulation } from '@angular/core';
import { TaigaModule } from '../../shared/taiga.module';
import { ShareModule } from '../../shared/share.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_TEXTFIELD_APPEARANCE_DIRECTIVE } from '@taiga-ui/core';
import { Router } from '@angular/router';

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
export class RegisterComponent {
  regisForm = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    isCheck: new FormControl(false, Validators.requiredTrue),
  });

  constructor(private router: Router) {}

  register() {
    this.router.navigate(['']).then();
  }
}
