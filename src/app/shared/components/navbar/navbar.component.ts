import { Component, Inject, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {

  constructor(private router: Router, @Inject(TuiDialogService) private readonly dialogs: TuiDialogService) { }
  ngOnInit(): void {
    if (this.router.url === '/home') this.itemSelected = 0;
    if (this.router.url === '/creator') this.itemSelected = 2;
    if (this.router.url === '/profile') this.itemSelected = 4;
  }



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

