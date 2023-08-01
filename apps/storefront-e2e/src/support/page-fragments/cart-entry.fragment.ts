import { QuantityInputFragment } from './quantity-input.fragment';

export class CartEntryFragment {
  private wrapper: HTMLElement;

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper;
  }

  getWrapper = () => cy.wrap(this.wrapper);
  getTitle = () => this.getWrapper().find('oryx-product-title').shadow();
  getActiveImage = () =>
    this.getWrapper().find('oryx-product-media').find('img');
  getDefaultImage = () =>
    this.getWrapper().find('oryx-product-media').find('oryx-icon');
  getSKU = () => this.getWrapper().find('oryx-product-id').shadow();
  getSalesPrice = () =>
    this.getWrapper()
      .find('oryx-product-price')
      .shadow()
      .find('oryx-site-price[part="sales"]');

  getOriginalPrice = () =>
    this.getWrapper().find('oryx-product-price').find('[part="original"]');
  getSubtotal = () => this.getWrapper().find('.pricing > oryx-site-price');
  getRemoveBtn = () => this.getWrapper().find('[aria-label="Remove"]');
  getQuantityInput = () =>
    new QuantityInputFragment(
      this.getWrapper().find('oryx-cart-quantity-input')
    );

  remove = () => this.getRemoveBtn().click();
}