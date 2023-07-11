import { ContentService } from '@spryker-oryx/content';
import { ContextController } from '@spryker-oryx/core';
import { resolve } from '@spryker-oryx/di';
import {
  computed,
  hydratable,
  signal,
  signalAware,
} from '@spryker-oryx/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { marked } from 'marked';
import { of } from 'rxjs';
import { ArticleContext } from '../../article-context';

@signalAware()
@hydratable()
export class ArticleComponent extends LitElement {
  protected contentService = resolve(ContentService);
  protected contextController = new ContextController(this);

  protected $articleId = signal(
    this.contextController.get<string>(ArticleContext.Id)
  );
  protected $articleType = signal(
    this.contextController.get<string>(ArticleContext.Type)
  );

  protected $data = computed(() => {
    const id = this.$articleId();
    const type = this.$articleType();

    return id && type ? this.contentService.get({ id, type }) : of(null);
  });

  protected override render(): TemplateResult | void {
    const data = this.$data();

    if (!data?.content) {
      return;
    }

    return html`<oryx-text
      .content=${marked.parse(data.content)}
    ></oryx-text> `;
  }
}