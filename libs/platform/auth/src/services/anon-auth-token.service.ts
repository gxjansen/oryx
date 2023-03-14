import { StorageService, StorageType } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';
import {
  catchError,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { AuthTokenData, AuthTokenService } from './auth-token.service';
import { AuthService } from './auth.service';
import { generateID } from './utils';

export class AnonAuthTokenService implements AuthTokenService {
  protected ANONYMOUS_USER_IDENTIFIER = 'oryx.anonymous-user';

  protected token$ = this.authService.isAuthenticated().pipe(
    switchMap(() =>
      this.authTokenService.getToken().pipe(
        tap(() => this.clearAnonymousId()),
        catchError(() => this.getAnonToken())
      )
    ),
    shareReplay(1)
  );

  constructor(
    protected readonly authService = inject(AuthService),
    protected readonly authTokenService = inject(AuthTokenService),
    protected readonly storage = inject(StorageService)
  ) {}

  getToken(): Observable<AuthTokenData> {
    return this.token$;
  }

  protected getAnonToken(): Observable<AuthTokenData> {
    return this.storage
      .get<string>(this.ANONYMOUS_USER_IDENTIFIER, StorageType.SESSION)
      .pipe(
        switchMap((userId) => {
          return userId ? of(userId) : this.createAnonymousId();
        }),
        map((userId) => ({ type: 'anon', token: userId }))
      );
  }

  protected createAnonymousId(): Observable<string> {
    const userId = generateID(8);
    return this.storage
      .set(this.ANONYMOUS_USER_IDENTIFIER, userId, StorageType.SESSION)
      .pipe(map(() => userId));
  }

  protected clearAnonymousId(): void {
    this.storage
      .remove(this.ANONYMOUS_USER_IDENTIFIER, StorageType.SESSION)
      .subscribe();
  }
}