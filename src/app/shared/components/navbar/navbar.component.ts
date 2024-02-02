import { Component, Inject } from '@angular/core';
import { NgClass } from "@angular/common";
import { Router } from '@angular/router';
import { TaigaModule } from '../../taiga.module';
import { TuiDialogService, TuiSizeL, TuiSizeS } from '@taiga-ui/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass, TaigaModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router, @Inject(TuiDialogService) private readonly dialogs: TuiDialogService) { }

  itemSelected = 0;
  navBarItems = [
    { icon: 'desktop_windows', path: '/home' },
    { icon: 'search', path: '' },
    { icon: 'edit_square', path: '/creator' },
    { icon: 'local_fire_department', path: '' },
    { icon: 'for_you', path: '/profile' }
  ];

  select(i: number) {
    this.itemSelected = i;
    this.router.navigate([this.navBarItems[i].path]);
  }

  open = false;

  readonly webApis = ['Common', 'Audio', 'Canvas', 'Geolocation', 'MIDI', 'Workers'];

  readonly tinkoff = [
    'Taiga-UI',
    'ng-event-plugins',
    'ng-polymorpheus',
    'ng-dompurify',
  ];

  toggle(open: boolean): void {
    this.open = open;
  }
}

