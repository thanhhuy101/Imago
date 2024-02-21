import {Component, Inject} from '@angular/core';
import {TaigaModule} from "../../../shared/taiga.module";
import {ShareModule} from "../../../shared/share.module";
import {TuiAlertService} from "@taiga-ui/core";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TaigaModule, ShareModule, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  readonly items = [
    {
      text: 'Post',
      router: '/post',
    },
    {
      text: 'Share',
      router: '/share',
    },
    {
      text: 'Mention',
      router: '/mention',
    },
  ];

  activeItemIndex = 0;

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService,private route:Router) {}


  onActiveItemChange(index: number) {

    this.onChangePage(index)
  }

  onChangePage(i:number){
    console.log(this.items[i].router);
    this.route.navigate(['/profile'+this.items[i].router]);

  }
}
