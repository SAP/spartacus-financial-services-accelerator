import { Pipe, PipeTransform } from '@angular/core';
import { HighlightPipe } from '@spartacus/storefront';

@Pipe({ name: 'cxFsHighlight' })
export class FSHighlightPipe extends HighlightPipe implements PipeTransform {
  transform(text: string, match?: string): string {
    return super.transform(text, match);
  }
}
