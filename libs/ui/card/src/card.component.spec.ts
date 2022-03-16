import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { queryFirstAssigned } from '../../utilities';
import { CardComponent } from './card.component';
import './index';

describe('Card', () => {
  let element: CardComponent;

  it('is defined', () => {
    const el = document.createElement('oryx-card');
    expect(el).to.be.instanceof(CardComponent);
  });

  describe('when header is provided by prop', () => {
    const headerProp = 'header';
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-card .header=${headerProp}></oryx-card>`
      );
    });

    it('should render title in default place', () => {
      const cardDefaultTitle = element?.shadowRoot?.querySelector('h5');

      expect(cardDefaultTitle).to.exist;
      expect(cardDefaultTitle?.textContent).to.be.equal(headerProp);
    });
  });

  describe('when header is provided by slot', () => {
    const titleText = 'Title provided by slot';

    beforeEach(async () => {
      element = await fixture(html`
        <oryx-card>
          <p slot="header">${titleText}</p>
        </oryx-card>
      `);
    });

    it('should render slot content', () => {
      const el = queryFirstAssigned(element, {
        selector: 'p',
        slot: 'header',
      }) as HTMLElement;

      expect(el.textContent).to.be.equal(titleText);
    });
  });

  describe('when content is provided', () => {
    const contentText = 'Content text';
    beforeEach(async () => {
      element = await fixture(html`
        <oryx-card>
          <p>${contentText}</p>
        </oryx-card>
      `);
    });

    it('should render content', () => {
      const el = queryFirstAssigned(element, {
        selector: 'p',
      }) as HTMLElement;

      expect(el.textContent).to.be.equal(contentText);
    });
  });

  describe('when footer is provided', () => {
    const footerText = 'Footer text';
    beforeEach(async () => {
      element = await fixture(html`
        <oryx-card>
          <p slot="footer">${footerText}</p>
        </oryx-card>
      `);
    });

    it('should render footer', () => {
      const el = queryFirstAssigned(element, {
        selector: 'p',
        slot: 'footer',
      }) as HTMLElement;

      expect(el.textContent).to.be.equal(footerText);
    });
  });
});