import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import { quantityInputComponent } from '@spryker-oryx/cart';
import { QuantityInputComponent } from '@spryker-oryx/cart/quantity-input';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector } from '@spryker-oryx/di';
import { siteProviders } from '@spryker-oryx/site';
import { html } from 'lit';
import { RemoveByQuantity } from '../../entry.model';
import { CartEntryPriceComponent } from '../price/price.component';
import { CartEntryContentComponent } from './content.component';
import { cartEntryContentComponent } from './content.defs';

describe('CartEntryContentComponent', () => {
  let element: CartEntryContentComponent;
  const options = {
    quantity: 2,
    calculations: { unitPrice: 1000, sumPrice: 2000 },
  };

  const getQuantityInputComponent = (): QuantityInputComponent => {
    return element.renderRoot.querySelector(
      'oryx-cart-quantity-input'
    ) as QuantityInputComponent;
  };

  beforeAll(async () => {
    await useComponent([cartEntryContentComponent, quantityInputComponent]);
  });

  beforeEach(async () => {
    createInjector({
      providers: siteProviders,
    });
    element = await fixture(html`<cart-entry-content
      .options=${options}
    ></cart-entry-content>`);
  });

  afterEach(() => {
    destroyInjector();
  });

  describe('content', () => {
    describe('prices', () => {
      it('should render unitPrice', () => {
        const unitPrice = element.renderRoot.querySelector(
          '.col:first-child cart-entry-price'
        ) as CartEntryPriceComponent;
        expect(unitPrice?.price).toBe(options.calculations.unitPrice);
      });

      it('should render sumPrice', () => {
        const sumPrice = element.renderRoot.querySelector(
          '.col:last-child cart-entry-price'
        ) as CartEntryPriceComponent;
        expect(sumPrice?.price).toBe(options.calculations.sumPrice);
      });
    });

    describe('quantity control', () => {
      it('should not be disabled', () => {
        expect(getQuantityInputComponent()?.disabled).toBe(false);
      });

      it('should have correct value', () => {
        expect(getQuantityInputComponent()?.value).toBe(options.quantity);
      });
    });
  });

  describe('when component is disabled', () => {
    beforeEach(async () => {
      element = await fixture(html`<cart-entry-content
        disabled
        .options=${{ ...options }}
      ></cart-entry-content>`);
    });
    it('should disable the input', () => {
      expect(getQuantityInputComponent()?.disabled).toBe(true);
    });
  });

  describe('when quantity is changed', () => {
    beforeEach(async () => {
      element = await fixture(html`<cart-entry-content
        .options=${{ ...options }}
      ></cart-entry-content>`);
      (getQuantityInputComponent() as QuantityInputComponent).value = 4;
      element.requestUpdate();
      await elementUpdated(element);
    });

    it('should update quantity input`s value', async () => {
      expect(getQuantityInputComponent()?.value).toBe(options.quantity);
    });
  });

  describe('removeByQuantity', () => {
    describe('when removeByQuantity is not set', () => {
      beforeEach(async () => {
        element = await fixture(html`<cart-entry-content
          .options=${{ ...options, quantity: 1 }}
        ></cart-entry-content>`);
      });

      it('should set min value to 1', () => {
        expect(getQuantityInputComponent()?.min).toBe(1);
      });
    });

    describe('when removeByQuantity is set to "allowZero"', () => {
      beforeEach(async () => {
        element = await fixture(html`<cart-entry-content
          .options=${{
            ...options,
            quantity: 1,
            removeByQuantity: RemoveByQuantity.AllowZero,
          }}
        ></cart-entry-content>`);
      });

      it('should set min value to 0', () => {
        expect(getQuantityInputComponent()?.min).toBe(0);
      });
    });

    describe('when removeByQuantity is set to "showBin"', () => {
      beforeEach(async () => {
        element = await fixture(html`<cart-entry-content
          .options=${{
            ...options,
            quantity: 1,
            removeByQuantity: RemoveByQuantity.ShowBin,
          }}
        ></cart-entry-content>`);
      });

      it('should set min value to 0', () => {
        expect(getQuantityInputComponent()?.min).toBe(0);
      });

      it('should use the trash icon for decreaseIcon', async () => {
        expect(getQuantityInputComponent().decreaseIcon).toEqual('trash');
      });
    });
  });

  describe('when readonly is provided', () => {
    beforeEach(async () => {
      element = await fixture(html`<cart-entry-content
        .options=${{
          ...options,
          readonly: true,
        }}
      ></cart-entry-content>`);
    });

    it('should not render quantity-input', async () => {
      expect(element).not.toContainElement('oryx-cart-quantity-input');
    });

    it('should render the readonly quantity', async () => {
      expect(element).toContainElement('.readonly-quantity');
    });
  });
});