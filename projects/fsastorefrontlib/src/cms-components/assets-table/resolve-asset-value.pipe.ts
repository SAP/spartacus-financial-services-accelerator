import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { RequestType } from '../../occ';

@Pipe({ name: 'resolveAssetValue' })
export class ResolveAssetValuePipe implements PipeTransform {
  constructor(private translation: TranslationService) {}

  transform(value: any, ...args: any[]): Observable<string> {
    const asset = args[0];

    if (value.propName) {
      return of(
        value.value.split('.').reduce((accum, curr) => accum?.[curr], asset)
      );
    }

    return this.allowedFSRequestTypesIsClaim(asset)
      ? this.translation.translate(value.value)
      : this.translation.translate('fscommon.none');
  }

  allowedFSRequestTypesIsClaim(asset) {
    const allowedFSRequestTypes = asset.categoryData.allowedFSRequestTypes;

    const claimRequestTypeSearch = allowedFSRequestTypes.findIndex(
      allowedRequestType =>
        allowedRequestType.requestType.code === RequestType.FSCLAIM
    );

    const claimRequestTypeFound = claimRequestTypeSearch > -1;
    return claimRequestTypeFound;
  }
}
