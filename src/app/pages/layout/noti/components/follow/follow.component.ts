import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [TuiButtonModule],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.scss',
})
export class FollowComponent {}
