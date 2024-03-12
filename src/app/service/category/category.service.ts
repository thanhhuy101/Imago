import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import { CategoryModel } from '../../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClientAuth) {}

  getCategory() {
    return this.httpClient.get('category');
  }

  getCategories(page: number) {
    return this.httpClient.get(`category/all?page=${page}`);
  }

  uploadUserCategory(category: CategoryModel) {
    return this.httpClient.post('category', category);
  }
}
