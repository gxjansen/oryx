import { fixture, html } from '@open-wc/testing-helpers';
import '@spryker-oryx/testing';
import { DropdownComponent } from '.';
import { a11yConfig } from '../../../a11y';
import { PopoverComponent } from '../../popover/src';
import './index';

const isJsdomSelectorValid = (selector: string): boolean => {
  try {
    document.createDocumentFragment().querySelector(selector);
  } catch {
    return false;
  }
  return true;
};

describe('DropdownComponent', () => {
  let element: DropdownComponent;

  const getPopover = (): PopoverComponent | null => {
    return element.renderRoot.querySelector('oryx-popover');
  };

  const dispatchCloseEvent = (e: Event): void => {
    (e.target as HTMLElement).dispatchEvent(
      new CustomEvent('oryx.close', {
        bubbles: true,
        composed: true,
      })
    );
  };

  beforeEach(async () => {
    element = await fixture(html`<oryx-dropdown></oryx-dropdown>`);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible(a11yConfig);
  });

  describe('when dropdown is closed', () => {
    it('should have "inert" attr on the popover', async () => {
      expect(getPopover()?.hasAttribute('inert')).toBe(true);
    });
  });

  describe('when "open" attr added', () => {
    beforeEach(async () => {
      element = await fixture(html`<oryx-dropdown open></oryx-dropdown>`);
    });

    it('should show the popover', async () => {
      expect(getPopover()?.hasAttribute('show')).toBe(true);
    });

    it('should remove "inert" attr from the popover', async () => {
      expect(getPopover()?.hasAttribute('inert')).toBe(false);
    });
  });

  /**
   * Currently jsdom doesn't support ":focus-within"
   * and brakes the tests are connected with this selector.
   *
   * Issue has already opened in jsdom repo and has feature mark
   * https://github.com/jsdom/jsdom/issues/3055
   *
   */
  if (isJsdomSelectorValid(':focus-within')) {
    describe('when "oryx.close" event dispatched', () => {
      let closeButton: HTMLButtonElement | null | undefined;

      beforeEach(async () => {
        element = await fixture(html`<oryx-dropdown>
          <button @click=${dispatchCloseEvent}></button>
        </oryx-dropdown>`);

        vi.useFakeTimers();

        closeButton = element.querySelector('button');
        closeButton?.focus();
        closeButton?.click();
      });

      afterEach(() => {
        vi.clearAllTimers();
      });

      it('should restore focus on trigger', () => {
        vi.advanceTimersByTime(0);
        expect(document.activeElement).toBe(
          element.renderRoot?.querySelector('slot[name="trigger"] button')
        );
      });
    });
  }
});