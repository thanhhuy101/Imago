import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink, NavigationStart } from '@angular/router';
import { TaigaModule } from '../../taiga.module';
import { TuiDialogService } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import * as AuthActions from '../../../../ngrx/auth/auth.actions';

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

  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState }>,
  ) {
   
    if(this.router.url === '/home'){
      this.activeItemIndex = 0;
     }else if(this.router.url.startsWith('/search')){
       this.activeItemIndex = 1;
     }
       else if(this.router.url.startsWith('/creator')){
       this.activeItemIndex = 2;
       }
       else if(this.router.url.startsWith('/notification')){
       this.activeItemIndex = 3;
       }
       else if(this.router.url.startsWith('/profile')){
       this.activeItemIndex = 4;
       }
  }

  ngOnInit(): void {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const url = event.url; 
        if (url === '/home') {
          this.activeItemIndex = 0;
        } else if (url.startsWith('/search')) {
          this.activeItemIndex = 1;
        } else if (url.startsWith('/creator')){
          this.activeItemIndex = 2;
        }else if (url.startsWith('/profile')){
          this.activeItemIndex = 4;
        }else if (url.startsWith('/notification')){
          this.activeItemIndex = 3;
        }
      }
    });
  
  }

  onClick(): void {
    this.open = !this.open;
  }

  openDrawer(open: boolean): void {
    this.openDrawerSidebar = open;
  }

  signOut(): void {
    console.log('sign out');
    this.store.dispatch(AuthActions.signOutWithGG());
  }
}
