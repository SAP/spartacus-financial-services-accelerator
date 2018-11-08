import { Injectable, Optional } from '@angular/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { ProductSearchService } from '../../product/services/product-search.service';
import { combineLatest, merge, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';

interface SearchBoxConfig {
  maxProducts: number;
  displaySuggestions: boolean;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;
  displayProducts: boolean;
}

@Injectable()
export class SearchBoxComponentService {
  defaultConfig: SearchBoxConfig = {
    maxProducts: 2,
    displaySuggestions: true,
    maxSuggestions: 5,
    minCharactersBeforeRequest: 3,
    displayProducts: false
  };

  config$: Observable<SearchBoxConfig> = of(this.defaultConfig);

  constructor(
    @Optional() protected componentData: CmsComponentData,
    public searchService: ProductSearchService,
    protected routingService: RoutingService
  ) {
    if (componentData) {
      this.config$ = merge(
        this.config$,
        this.componentData.data$.pipe(
          map(config => ({ ...this.defaultConfig, ...config }))
        )
      );
    }
  }

  search = (text$: Observable<string>) =>
    combineLatest(
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.config$
    ).pipe(
      switchMap(([term, config]) => {
        if (term.length >= config.minCharactersBeforeRequest) {
          return this.fetch(term, config);
        } else {
          return of([]);
        }
      })
    );

  public launchSearchPage(query: string) {
    this.routingService.go(['/search', query]);
  }

  private fetch(text: string, config: SearchBoxConfig): Observable<any[]> {
    this.executeSearch(text, config);

    const sugg = this.searchService.searchSuggestions$.pipe(
      map(res => res.map(suggestion => suggestion.value))
    );

    const prod = this.searchService.auxSearchResults$.pipe(
      map(res => res.products || [])
    );
    return combineLatest(sugg, prod).pipe(map(([a, b]) => [...a, ...b]));
  }

  private executeSearch(search: string, config: SearchBoxConfig) {
    if (config.displayProducts) {
      this.searchService.searchAuxiliary(search, {
        pageSize: config.maxProducts
      });
    }

    if (config.displaySuggestions) {
      this.searchService.getSuggestions(search, {
        pageSize: config.maxSuggestions
      });
    }
  }
}
