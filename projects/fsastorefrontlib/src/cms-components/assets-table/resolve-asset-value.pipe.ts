import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@spartacus/core';
import { RequestType } from '../../occ';

@Pipe({ name: 'resolveAssetValue' })
export class ResolveAssetValuePipe implements PipeTransform {
  constructor(private tpipe: TranslatePipe) {}

  transform(value: any, ...args: any[]) {
    const asset = args[0];

    if (value.propName) {
      return value.value
        .split('.')
        .reduce((accum, curr) => accum?.[curr], asset);
    }

    const allowedFSRequestTypes = asset.categoryData.allowedFSRequestTypes;

    return allowedFSRequestTypes
      .map(allowedRequestType => allowedRequestType.requestType.code)
      .indexOf(RequestType.FSCLAIM) > -1
      ? this.tpipe.transform(value.value)
      : this.tpipe.transform('fscommon.notAvailable');
  }
}
