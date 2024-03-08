import { Component } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent {
  users = [
    {
      name: 'Alex Born',
      bio: 'alex',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      img: '',
      follower: ['John', 'Kim', 'Jan'],
    },
    {
      name: 'John Doe',
      bio: 'John',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      img: '',
      follower: ['Kim', 'Jan'],
    },
  ];
}
