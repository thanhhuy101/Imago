import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileState } from '../../../../../../ngrx/profile/state/profile.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit {
  list = [
    {
      id: 1,
      picture:
        'https://th.bing.com/th/id/OIP.aejWUPmXrI2HacWQHZaPywHaE8?pid=ImgDet&w=192&h=128&c=7&dpr=3',
      name: '',
      username: '',
      cap: 'For different stages of your workflow, for example, feature proposal, feature improvement, or a bug report',
      follow: false,
    },
    {
      id: 2,
      picture:
        'https://th.bing.com/th?id=OIP.FYA1sc0wKr42RwjQJ5_GTAHaLM&w=203&h=307&c=8&rs=1&qlt=90&o=6&dpr=3&pid=3.1&rm=2',
      name: '',
      username: '',
      cap: 'For different stages of your workflow, for example, feature proposal, feature improvement, or a bug report',
      follow: false,
    },
    {
      id: 3,
      picture:
        'https://th.bing.com/th?q=Pink+Tree&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247',
      name: '',
      username: '',
      cap: 'For different stages of your workflow, for example, feature proposal, feature improvement, or a bug report',
      follow: false,
    },
  ];

  $profiles = this.store.select((state) => state.profiles.profileList);
  constructor(private store: Store<{ profiles: ProfileState }>) {}
  ngOnInit(): void {
    
  }
}
