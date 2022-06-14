import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'resolveAssetValue' })
export class ResolveAssetValuePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    const asset = args[0];

    if (value.propName) {
      return value.value
        .split('.')
        .reduce((accum, curr) => accum?.[curr], asset);
    }

    return asset.categoryData.code === 'insurances_auto' ? value.value : 'N/A';
  }
}
