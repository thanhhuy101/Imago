import {Component, Inject} from '@angular/core';
import {TaigaModule} from "../../../shared/modules/taiga.module";
import {ShareModule} from "../../../shared/modules/share.module";
import {Router, RouterOutlet} from "@angular/router";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  selector: 'app-noti',
  standalone: true,
  imports: [TaigaModule,ShareModule,RouterOutlet],
  templateUrl: './noti.component.html',
  styleUrl: './noti.component.scss'
})
export class NotiComponent {
  readonly items = [
    {
      text: 'All',
      router: '/all',
    },
    {
      text: 'Like',
      router: '/like',
    },
    {
      text: 'Comment',
      router: '/comment',
    },
    {
      text: 'Follow',
      router: '/follow',
    },
  ];

  activeItemIndex = 0;

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService,private route:Router) {}


  onActiveItemChange(index: number) {

    this.onChangePage(index)
  }

  onChangePage(i:number){
    console.log(this.items[i].router);
    this.route.navigate(['/noti'+this.items[i].router]);

  }
}
