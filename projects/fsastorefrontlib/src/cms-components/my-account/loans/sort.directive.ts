import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Loan } from './models/loan-interface';

export type SortColumn = keyof Loan | '';
export type SortDirection = 'asc' | 'desc' | '';

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'th[appSortable]',
})
export class SortDirective {
  @Input() appSortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.asc')
  public get isAsc(): boolean {
    return this.direction === 'asc';
  }

  @HostBinding('class.desc')
  public get isDesc(): boolean {
    return this.direction === 'desc';
  }

  @HostBinding('class.noOrder')
  public get isNoOrder(): boolean {
    return this.direction === '';
  }

  @HostListener('click') rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.appSortable, direction: this.direction });
  }
}
