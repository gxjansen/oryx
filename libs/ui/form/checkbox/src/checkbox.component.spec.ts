import { fixture, html } from '@open-wc/testing-helpers';
import '@spryker-oryx/testing';
import { a11yConfig } from '../../../a11y';
import { CheckboxComponent } from './checkbox.component';
import './index';

const getInput = (element: CheckboxComponent): HTMLInputElement => {
  const [input] = element.shadowRoot
    ?.querySelector('slot')
    ?.assignedElements() as Element[];

  return <HTMLInputElement>input;
};

describe('CheckboxComponent', () => {
  let element: CheckboxComponent;

  it('is defined', () => {
    const el = document.createElement('oryx-checkbox');
    expect(el).to.be.instanceof(CheckboxComponent);
  });

  describe('when checkbox is disabled', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-checkbox
          ><input type="checkbox" disabled />Option</oryx-checkbox
        >`
      );
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible(a11yConfig);
    });

    it('should reflect the disabled attribute on the input element', () => {
      const input = getInput(element);

      expect(input.disabled).to.be.true;
    });

    describe('but when it becomes not disabled', () => {
      beforeEach(async () => {
        const input = getInput(element);

        input?.removeAttribute('disabled');
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      it('the host should not have disabled attribute', () => {
        const input = getInput(element);

        expect(input.disabled).to.be.false;
      });
    });
  });

  describe('when checkbox is checked', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-checkbox
          ><input type="checkbox" checked />Option</oryx-checkbox
        >`
      );
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible(a11yConfig);
    });

    it('should reflect the checked attribute on the input element', () => {
      const input = getInput(element);

      expect(input.checked).to.be.true;
    });

    describe('but when it becomes not checked', () => {
      beforeEach(async () => {
        const input = getInput(element);

        input?.removeAttribute('checked');
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      it('the host should not have checked attribute', () => {
        const input = getInput(element);

        expect(input.checked).to.be.false;
      });
    });
  });

  describe('when checkbox is intermediate', () => {
    beforeEach(async () => {
      element = await fixture(
        html` <oryx-checkbox intermediate
          ><input type="checkbox" />Option</oryx-checkbox
        >`
      );
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible(a11yConfig);
    });

    it('should reflect the intermediate attribute on the host element', () => {
      expect(element?.getAttribute('intermediate')).to.exist;
    });
  });
  describe('when checkbox has error', () => {
    beforeEach(async () => {
      element = await fixture(
        html` <oryx-checkbox error
          ><input type="checkbox" />Option</oryx-checkbox
        >`
      );
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible(a11yConfig);
    });

    it('should reflect the error attribute on the host element', () => {
      expect(element?.getAttribute('error')).to.exist;
    });
  });
  describe('when the checkbox is checked/unchecked', () => {
    beforeEach(async () => {
      element = await fixture(
        html` <oryx-checkbox><input type="checkbox" />Option</oryx-checkbox>`
      );
    });
    it('should dispatch a "input" event', () => {
      const input = getInput(element);

      expect(input.checked).to.be.false;
      input.click();
      expect(input.checked).to.be.true;
    });
  });
  describe('when the checkbox is disabled checked/unchecked', () => {
    beforeEach(async () => {
      element = await fixture(
        html` <oryx-checkbox
          ><input type="checkbox" disabled />Option</oryx-checkbox
        >`
      );
    });
    it('should dispatch a "input" event', () => {
      const input = getInput(element);

      expect(input.checked).to.be.false;
      input.click();
      expect(input.checked).to.be.false;
    });
  });
});