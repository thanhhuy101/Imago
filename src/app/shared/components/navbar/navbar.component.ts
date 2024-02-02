import { Component } from '@angular/core';
import { NgClass } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) { }

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

}
