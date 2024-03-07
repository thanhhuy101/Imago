import {ChangeDetectionStrategy, Component} from '@angular/core';
import { ShareModule } from '../../shared/share.module';
import { TaigaModule } from '../../shared/taiga.module';
@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestComponent {
  //carousel
  index = 0;
  readonly itemsCount = 5;
  readonly items = [
    {
      title: 'ART',
      logo: 'Brush',
      isActive: false,
    },
    {
      title: 'DESIGN',
      logo: 'Draw',
      isActive: false,

    },
    {
      title: 'PHOTOGRAPHY',
      logo: 'photo_camera',
      isActive: false,

    },
    {
      title: 'TRAVEL',
      logo: 'beach_access',
      isActive: false,

    },
    {
      title: 'FOOD',
      logo: 'local_dining',
      isActive: false,

    },
    {
      title: 'FASHION',
      logo: 'apparel',
      isActive: false,

    },
    {
      title: 'MUSIC',
      logo: 'headphones',
      isActive: false,

    },
    {
      title: 'SPORT',
      logo: 'sports_basketball',
      isActive: false,

    },
    {
      title: 'TECHNOLOGY',
      logo: 'computer',
      isActive: false,

    },
    {
      title: 'HEALTH',
      logo: 'ecg_heart',
      isActive: false,

    },
    {
      title: 'BEAUTY',
      logo: 'health_and_beauty',
      isActive: false,

    },
    {
      title: 'CARS',
      logo: 'directions_car',
      isActive: false,
    },

  ];
  readonly secondaryItems = [
    {
      title: 'ART',
      logo: 'Brush',
      isActive: false,
    },
    {
      title: 'DESIGN',
      logo: 'Draw',
      isActive: false,

    },
    {
      title: 'PHOTOGRAPHY',
      logo: 'photo_camera',
      isActive: false,

    },
    {
      title: 'TRAVEL',
      logo: 'beach_access',
      isActive: false,

    },
    {
      title: 'FOOD',
      logo: 'local_dining',
      isActive: false,

    },
    {
      title: 'FASHION',
      logo: 'apparel',
      isActive: false,

    },
    {
      title: 'MUSIC',
      logo: 'headphones',
      isActive: false,

    },
    {
      title: 'SPORT',
      logo: 'sports_basketball',
      isActive: false,

    },
    {
      title: 'TECHNOLOGY',
      logo: 'computer',
      isActive: false,

    },
    {
      title: 'HEALTH',
      logo: 'ecg_heart',
      isActive: false,

    },
    {
      title: 'BEAUTY',
      logo: 'health_and_beauty',
      isActive: false,

    },
    {
      title: 'CARS',
      logo: 'directions_car',
      isActive: false,
    },
  ];

  // items
  selectedItems:any = [];
  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }

  toggleActive(item: any) {
    if (this.selectedItems.length < 5) {
      item.isActive = !item.isActive;
      if (item.isActive) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems = this.selectedItems.filter(
          (i: any) => i.title !== item.title,
        );
      }
    } else {
      if (item.isActive) {
        item.isActive = !item.isActive;
        this.selectedItems = this.selectedItems.filter(
          (i: any) => i.title !== item.title,
        );
      }
    }
  }
}
