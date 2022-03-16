import { expect, fixture, html } from '@open-wc/testing';
import { SelectComponent } from '.';
import { a11yConfig } from '../../a11y';
import { getControl } from '../../input';
import {
  ClearIconAppearance,
  ClearIconPosition,
  SearchIconPosition,
} from '../../search';
import './index';

describe('SelectComponent', () => {
  let element: SelectComponent;

  describe('options', () => {
    const expectOptions = (
      suffixIcon: string,
      searchIconPosition: SearchIconPosition,
      clearIconPosition: ClearIconPosition,
      clearIconAppearance: ClearIconAppearance
    ): void => {
      it('should have default suffixIcon', () => {
        expect(element.options.suffixIcon).to.eq(suffixIcon);
      });

      it('should have default searchIconPosition', () => {
        expect(element.options.searchIconPosition).to.eq(searchIconPosition);
      });

      it('should have default clearIconPosition', () => {
        expect(element.options.clearIconPosition).to.eq(clearIconPosition);
      });

      it('should have default clearIconAppearance', () => {
        expect(element.options.clearIconAppearance).to.eq(clearIconAppearance);
      });
    };

    describe('when created without control', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select .options=${{ label: 'some label' }}></oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.SUFFIX,
        ClearIconAppearance.HOVER
      );
    });

    describe('when created with an <input /> control', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select .options=${{ label: 'some-label' }}
            ><input
          /></oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.SUFFIX,
        ClearIconAppearance.HOVER
      );
    });

    describe('when created with an <input /> control with empty values allowed', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select
            .options=${{ allowEmptyValue: true, label: 'some label' }}
          >
            <input />
          </oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.SUFFIX,
        ClearIconAppearance.HOVER
      );
    });

    describe('when created with an <input /> control with empty values not allowed', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select
            .options=${{ allowEmptyValue: false, label: 'some label' }}
          >
            <input />
          </oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.NONE,
        ClearIconAppearance.HOVER
      );
    });

    describe('when created with a <select> control', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-select .options=${{ label: 'some label' }}
            ><select></select
          ></oryx-select>`
        );
      });

      it('passes the a11y audit', async () => {
        await expect(element).shadowDom.to.be.accessible(a11yConfig);
      });

      expectOptions(
        'dropdown',
        SearchIconPosition.NONE,
        ClearIconPosition.NONE,
        ClearIconAppearance.HOVER
      );
    });
  });

  describe('focus', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-select><input value="foo" /></oryx-select>`
      );
    });
    describe('when the focusin event is dispatched', () => {
      beforeEach(() => {
        getControl(element)?.dispatchEvent(
          new Event('focusin', { bubbles: true })
        );
      });
      it('should not show the options', () => {
        expect(
          element.renderRoot.querySelector('oryx-popover')?.hasAttribute('show')
        ).to.be.false;
      });
    });
  });
});