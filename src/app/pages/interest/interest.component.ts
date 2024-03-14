import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ShareModule } from '../../shared/share.module';
import { TaigaModule } from '../../shared/taiga.module';
import { CategoryState } from '../../../ngrx/category/category.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as CategoryActions from '../../../ngrx/category/category.actions';
import * as ProfileActions from '../../../ngrx/profile/profile.actions';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { CategoryModel } from '../../model/category.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification/notification.service';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import { ProfileModel } from '../../model/profile.model';

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
  loader = false;
  isSelectAll = false;
  isGetSuccess = false;

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
  categoriesAllSuccess$ = this.store.select('category', 'allCategories');
  isGetProfileSuccess$ = this.store.select('profile', 'profile');

  isUpdatingProfile$ = this.store.select('profile', 'isUpdating');
  isUpdateProfileSuccess$ = this.store.select('profile', 'isUpdateSuccess');

  // category
  categories: CategoryModel[] = [];
  haveCategories = false;
  allCategories: CategoryModel[] = [];
  //carousel
  page = 1;
  index = 0;
  itemsCount = 5;
  items: Category[] = [];
  secondaryItems: Category[] = [];

  // items
  selectedItems: any = [];
  countSelected = 0;
  profile: ProfileModel = {
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
    id: '',
    bio: '',
    photoUrl: '',
    followers: [],
    following: [],
    phone: '',
    category: [],
    gender: '',
  };

  constructor(
    private router: Router,
    private store: Store<{
      category: CategoryState;
      auth: AuthState;
      profile: ProfileState;
    }>,
    private alertService: NotificationService,
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
        if (token) {
          this.store.dispatch(
            CategoryActions.getCategoryList({ page: this.page }),
          );
        }
      }),

      this.isGetProfileSuccess$.subscribe((profile) => {
        if (profile) {
          this.profile = profile;
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

      // this.categoriesAllSuccess$.subscribe((category) => {
      //   if (category) {
      //     this.selectedItems = category;
      //     if(this.selectedItems.length > 0){
      //       this.haveCategories = true;
      //     }
      //   }
      // }),
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
      console.log('item', item);
      this.countSelected++;
    } else {
      this.countSelected--;
      this.selectedItems = this.selectedItems.filter(
        (i: any) => i.title !== item.title,
      );
    }

    if (this.selectedItems.length > 0) {
      this.haveCategories = true;
    } else {
      this.haveCategories = false;
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
    let listCategory = this.selectedItems.map((item: any) => item.id);
    let profile: ProfileModel = {
      ...this.profile,
      category: listCategory,
    };
    if (listCategory.length > 0) {
      this.store.dispatch(ProfileActions.updateMine({ mine: profile }));
    } else {
      this.alertService.errorNotification('Please select at least 1 category');
    }
  }

  selectAllItems() {
    this.store.dispatch(CategoryActions.getAllCategoryList());
    this.subscription.push(
      this.categoriesAllSuccess$.subscribe((category) => {
        if (category) {
          this.selectedItems = category;
          this.haveCategories = true;
        }
      }),
    );
    this.countSelected = 60;
    this.items.forEach((item) => {
      item.isActive = true;
      if (this.items.length < 30) {
      }
    });

    this.secondaryItems.forEach((item) => {
      item.isActive = true;
    });

    this.isSelectAll = true;
  }

  unselectAllItems() {
    this.selectedItems = [];
    this.countSelected = 0;
    this.items.forEach((item) => {
      item.isActive = false;
    });

    this.secondaryItems.forEach((item) => {
      item.isActive = false;
    });

    this.isSelectAll = false;

    if (this.selectedItems.length > 0) {
      this.haveCategories = true;
    } else {
      this.haveCategories = false;
    }
  }
}
