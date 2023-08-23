import { createQuery, QueryState } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';
import { LocaleChanged } from '@spryker-oryx/i18n';
import { combineLatest, map, Observable } from 'rxjs';
import { Content, ContentQualifier } from '../models';
import { ContentAdapter } from './content.adapter';
import { ContentService } from './content.service';

export class DefaultContentService implements ContentService {
  constructor(protected adapters = inject(ContentAdapter)) {}

  protected contentQuery = createQuery<Content | null, ContentQualifier>({
    loader: (q: ContentQualifier) =>
      combineLatest(this.adapters.map((adapter) => adapter.get(q))).pipe(
        map((contents) =>
          contents.reduce(
            (acc, curr) => (curr ? { ...acc, ...curr } : acc),
            null
          )
        )
      ),
    refreshOn: [LocaleChanged],
  });

  protected contentsQuery = createQuery<Content[] | null, ContentQualifier>({
    loader: (q: ContentQualifier) =>
      combineLatest(this.adapters.map((adapter) => adapter.getAll(q))).pipe(
        map((contents) =>
          contents.reduce(
            (acc, curr) => [...(acc ?? []), ...(curr ?? [])],
            [] as Content[]
          )
        )
      ),
    onLoad: [
      ({ data }) => {
        data?.forEach((content) => {
          this.contentQuery.set({
            data: content,
            qualifier: { id: content.id },
          });
        });
      },
    ],
    refreshOn: [LocaleChanged],
  });

  getAll(
    qualifier: ContentQualifier
  ): Observable<Content[] | null | undefined> {
    return this.contentsQuery.get(qualifier);
  }

  get(qualifier: ContentQualifier): Observable<Content | null | undefined> {
    return this.contentQuery.get(qualifier);
  }

  getState(
    qualifier: ContentQualifier
  ): Observable<QueryState<Content | null>> {
    return this.contentQuery.getState(qualifier);
  }
}
