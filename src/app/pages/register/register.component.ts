import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TaigaModule} from "../../shared/taiga.module";
import {AsyncPipe} from "@angular/common";
import {ReactiveFormsModule,FormControl , FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [TaigaModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly registForm = new FormGroup({
    userName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    checkBox: new FormControl( false),

  });
}
