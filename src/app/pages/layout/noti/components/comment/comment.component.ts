import { Component } from '@angular/core';
import { ShareModule } from '../../../../../shared/share.module';
import { TaigaModule } from '../../../../../shared/taiga.module';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comments = [
    {
      name: '',
      kind: '',
      time: '',
    },
  ];
}
