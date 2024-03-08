import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ShareModule } from '../../shared/share.module';
import { TaigaModule } from '../../shared/taiga.module';
import { CategoryService } from '../../service/category/category.service';
import { CategoryState } from '../../../ngrx/category/category.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as CategoryActions from '../../../ngrx/category/category.actions';
import { AuthState } from '../../../ngrx/auth/auth.state';

@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  // observable
  categories$ = this.store.select((state) => state.category.categories);

  // category
  categories : any = []

  //carousel
  page = 1;
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
  selectedItems: any = [];

  constructor(
    private categoryService: CategoryService,
    private store: Store<{ category: CategoryState; auth: AuthState }>,
  ) {}

  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.subscription.push(
      this.store.select('auth', 'token').subscribe((token) => {
        if (token != '') {
          if (this.page < 6)
          this.store.dispatch(CategoryActions.getCategoryList({ page: this.page }));
          this.categories$.subscribe((categories) => {
            if (categories.length !== 0) {
              let data = {...categories} as any;
              this.categories = {...data.data};
              this.page++;
              console.log(this.categories);
            }
          });
        }
      }),
    );

  }

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
