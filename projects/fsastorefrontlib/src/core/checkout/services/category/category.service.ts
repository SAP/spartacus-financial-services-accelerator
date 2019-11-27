import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  currentCategorySource = new BehaviorSubject<string>('');

  getActiveCategory(): Observable<string> {
    return this.currentCategorySource.asObservable();
  }

  setActiveCategory(categoryCode: string) {
    this.currentCategorySource.next(categoryCode);
  }
}
