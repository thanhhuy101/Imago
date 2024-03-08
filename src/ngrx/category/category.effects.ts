import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '../../app/service/category/category.service';
import { catchError, map, of, switchMap } from 'rxjs';
import * as CategoryActions from './category.actions';

@Injectable()
export class CategoryEffect {
  constructor(
    private action$: Actions,
    private categoryService: CategoryService,
  ) {}

  getCategories$ = createEffect(() => {
    return this.action$.pipe(
      ofType(CategoryActions.getCategoryList),
      switchMap((action) => {
        return this.categoryService.getCategories(action.page).pipe(
          map((response) => {
            return CategoryActions.getCategoryListSuccess({
              categoryList: response,
            });
          }),
          catchError((error) => {
            return of(CategoryActions.getCategoryListFailure({ error }));
          }),
        );
      }),
    );
  });
}
