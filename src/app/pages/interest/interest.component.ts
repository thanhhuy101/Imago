import {ChangeDetectionStrategy, Component} from '@angular/core';
import { ShareModule } from '../../shared/share.module';
import { TaigaModule } from '../../shared/taiga.module';
@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestComponent {
  constructor() {}

}
