import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const logger = (message: string) => (source: Observable<any>) =>
  source.pipe(
    tap(value => {
      console.log(message + ': ', value);
    })
  );
