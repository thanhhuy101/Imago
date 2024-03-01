import { Component } from '@angular/core';
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    TuiButtonModule
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent {

}
