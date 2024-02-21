import {Component, Inject} from '@angular/core';
import {NgForOf} from "@angular/common";
import {TuiTabsModule} from "@taiga-ui/kit";
import {Router, RouterOutlet} from "@angular/router";
import {TuiAlertService} from "@taiga-ui/core";
import {TaigaModule} from "../../../../shared/modules/taiga.module";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgForOf,
    TuiTabsModule,
    RouterOutlet,
    TaigaModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  readonly items = [
    {
      text: 'Post',
      router: '/post',
      icon: 'tuiIconFileText',
    },
    {
      text: 'People',
      router: '/people',
      icon: 'tuiIconUser',
    },
    {
      text: 'Group',
      router: '/group',
      icon: 'tuiIconUsers',
    },

    {
      text: 'Explore',
      router: '/explore',
      icon: 'tuiIconCompassLarge',
    },

  ];

  activeItemIndex = 0;

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService,private route:Router) {}


  onActiveItemChange(index: number) {

    this.onChangePage(index)
  }

  onChangePage(i:number){
    console.log(this.items[i].router);
    this.route.navigate(['/search'+this.items[i].router]);

  }
}
