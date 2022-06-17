import { hydratable } from '@spryker-oryx/core';
import {
  ContentComponentProperties,
  ContentController,
} from '@spryker-oryx/experience';
import { asyncValue } from '@spryker-oryx/lit-rxjs';
import {
  ProductComponentProperties,
  ProductController,
} from '@spryker-oryx/product';
import { LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import { html } from 'lit/static-html.js';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ProductDescriptionContent } from './model';

@hydratable()
export class ProductDescriptionComponent
  extends LitElement
  implements
    ProductComponentProperties,
    ContentComponentProperties<ProductDescriptionContent>
{
  @property() sku?: string;
  @property() uid?: string;
  @property({ type: Object }) content?: ProductDescriptionContent;

  protected productController = new ProductController(this);
  protected product$ = this.productController.getProduct();
  protected contentController = new ContentController(this);
  protected content$ = this.contentController.getContent();
  protected isHidden$ = new BehaviorSubject(0);

  protected descriptions$ = combineLatest([
    this.isHidden$,
    this.product$,
    this.content$,
  ]).pipe(
    map(([isHidden, product, contents]) => {
      const description = product?.description ?? '';
      const truncateAfter = contents?.truncateCharacterCount;
      if (!truncateAfter || description.length < truncateAfter) {
        return {
          shouldTruncate: false,
          isHidden: isHidden > 0,
          description: this.convertToHTML(description),
        };
      }

      if (isHidden === 0) {
        isHidden = contents?.isTruncated ? 1 : -1;
      }

      const content =
        isHidden > 0
          ? `${description.slice(0, truncateAfter)}...`
          : description;

      return {
        shouldTruncate: true,
        isHidden: isHidden > 0,
        description: this.convertToHTML(content),
      };
    })
  );

  protected convertToHTML(text: string): string {
    return `<p>${text
      .split(/(\r?\n){2,}/)
      .map((s) => s.trim())
      .filter((s) => s.length)
      .map((s) => s.replace(/\r?\n/g, '<br />'))
      .join('</p><p>')}</p>`;
  }

  toggle(): void {
    if (this.isHidden$.getValue() === 0) {
      this.isHidden$.next(this.content?.isTruncated ? -1 : 1);
    } else {
      this.isHidden$.next(-1 * this.isHidden$.getValue());
      ``;
    }
  }

  protected override render(): TemplateResult {
    return html`
      ${asyncValue(
        this.descriptions$,
        ({ description, isHidden, shouldTruncate }) => {
          return html`
            ${unsafeHTML(description)}
            ${when(
              shouldTruncate,
              () => html`
                <oryx-button type="text">
                  <button @click="${this.toggle}">
                    ${isHidden ? 'Read more' : 'Read less'}
                  </button>
                </oryx-button>
              `,
              () => html``
            )}
          `;
        }
      )}
    `;
  }
}