import { fixture } from '@open-wc/testing-helpers';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector } from '@spryker-oryx/injector';
import { mockProductProviders } from '@spryker-oryx/product/mocks';
import { TextComponent } from '@spryker-oryx/ui/text';
import { html } from 'lit';
import { ProductDescriptionContent } from '../index';
import { productDescriptionComponent } from './component';
import { ProductDescriptionComponent } from './description.component';

describe('ProductDescriptionComponent', () => {
  let element: ProductDescriptionComponent;

  beforeAll(async () => {
    await useComponent(productDescriptionComponent);
  });

  beforeEach(async () => {
    createInjector({
      providers: mockProductProviders,
    });
    element = await fixture(
      html` <product-description
        sku="1"
        uid="1"
        .content="${{ truncateAfter: 100 }}"
      ></product-description>`
    );
  });

  afterEach(() => {
    destroyInjector();
  });

  it('should passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('when the component is rendered', () => {
    const oneLineBreak = `with one
    line break`;

    beforeEach(async () => {
      element = await fixture(
        html` <product-description
          .product=${{ description: oneLineBreak }}
          .options=${{
            truncateAfter: 3,
            showToggle: true,
            expanded: true,
          } as ProductDescriptionContent}
        ></product-description>`
      );
    });

    it('should slot the product description into the oryx-text component', () => {
      expect(element.shadowRoot?.querySelector('oryx-text p')?.innerHTML).toBe(
        'with one<br>line break'
      );
    });

    it('should slot configure the oryx-text component', () => {
      expect(
        (element.shadowRoot?.querySelector('oryx-text') as TextComponent)
          ?.expanded
      ).toBe(true);
      expect(
        (element.shadowRoot?.querySelector('oryx-text') as TextComponent)
          ?.showToggle
      ).toBe(true);
    });
  });
});
