import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TaigaModule } from '../../taiga.module';
import { TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, TaigaModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  activeItemIndex = 0;
  open = false;
  openDrawerSidebar = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick(): void {
    this.open = !this.open;
  }

  openDrawer(open: boolean): void {
    this.openDrawerSidebar = open;
  }
}
