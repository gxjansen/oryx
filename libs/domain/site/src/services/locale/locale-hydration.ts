import { HydrationTrigger } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';
import { Observable, skip, take } from 'rxjs';
import { LocaleService } from './locale.service';

export const localeHydration = {
  provide: HydrationTrigger,
  useFactory: (): Observable<unknown> =>
    inject(LocaleService).get().pipe(skip(1), take(1)),
};