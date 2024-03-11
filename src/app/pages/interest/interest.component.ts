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
import { CategoryModel } from '../../model/category.model';
import { set } from '@firebase/database';
import { Router } from '@angular/router';

type Category = {
  id: string;
  title: string;
  logo: string;
  isActive: boolean;
};

@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss',
})
export class InterestComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  isLoading = false;

  // observable
  token$ = this.store.select('auth', 'token');
  getCategoriesSucces$ = this.store.select(
    'category',
    'getCategoryListSuccess',
  );
  isGettingCategoryList$ = this.store.select(
    'category',
    'isGettingCategoryList',
  );
  categories$ = this.store.select('category', 'categories');

  // category
  categories: CategoryModel[] = [];

  //carousel
  page = 1;
  index = 0;
  itemsCount = 5;
  items: Category[] = [];
  secondaryItems: Category[] = [];

  // items
  selectedItems: any = [];

  constructor(
    private router: Router,
    private store: Store<{ category: CategoryState; auth: AuthState }>,
  ) {
    for (let index = 0; index < 50; index++) {
      this.items[index] = {
        id: '',
        title: '',
        logo: '',
        isActive: false,
      };
      this.secondaryItems[index] = {
        id: '',
        title: '',
        logo: '',
        isActive: false,
      };
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscription.push(
      this.token$.subscribe((token) => {
        if (token != '' && token != undefined) {
          this.store.dispatch(
            CategoryActions.getCategoryList({ page: this.page }),
          );
        }
      }),

      this.isGettingCategoryList$.subscribe((loading) => {
        if (loading) {
          setTimeout(() => {
            this.isLoading = true;
          }, 3000);
        }
      }),

      this.getCategoriesSucces$.subscribe((success) => {
        if (success) {
          this.isLoading = true;
        }
      }),

      this.categories$.subscribe((categories) => {
        if (categories.length === 0) {
          this.isLoading = true;
        } else {
          let data = { ...categories } as any;
          this.mappingCategory(data.data, this.page);
        }
      }),
    );
  }

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
    if (this.index > 0) {
      this.page = this.index / this.itemsCount + 1;
    }

    this.getCategoriesByPage(this.index, this.page);
  }

  toggleActive(item: any) {
    item.isActive = !item.isActive;
    if (item.isActive) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(
        (i: any) => i.title !== item.title,
      );
    }
  }

  mappingCategory(categories: any, page: number) {
    let data = categories;
    let start = (page - 1) * this.itemsCount;
    let end = page * this.itemsCount;
    let i = 0;

    for (let index = start; index < end; index++) {
      if (data[i] != undefined) {
        this.items[index].id = data[i].id;
        this.items[index].title = data[i].name;
        this.items[index].logo = data[i].photoUrl;
        i++;
      }
    }

    for (let index = end; index > start; index--) {
      if (data[i] != undefined) {
        this.secondaryItems[index - 1].id = data[i].id;
        this.secondaryItems[index - 1].title = data[i].name;
        this.secondaryItems[index - 1].logo = data[i].photoUrl;
        i++;
      }
    }
  }

  getCategoriesByPage(index: any, page: number) {
    this.index = index;
    this.page = page;
    this.store.dispatch(CategoryActions.getCategoryList({ page: page }));

    this.categories$.subscribe((categories) => {
      if (categories.length === 0) {
        this.isLoading = true;
      } else {
        let data = { ...categories } as any;
        this.mappingCategory(data.data, page);
      }
    });
  }

  next() {
    this.selectedItems.forEach((item: any) => {
      console.log(item.id);
    });
    this.router.navigate(['/home']).then();
  }
}
