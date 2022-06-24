import { elementUpdated, fixture, html } from '@open-wc/testing-helpers';
import '@spryker-oryx/testing';
import { getShadowElementBySelector } from '@spryker-oryx/testing';
import { beforeEach, describe } from 'vitest';
import './index';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let element: PaginationComponent;

  it('is defined', () => {
    const el = document.createElement('oryx-pagination');
    expect(el).toBeInstanceOf(PaginationComponent);
  });

  describe('pagination initial state', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-pagination><a>1</a></oryx-pagination>`
      );
    });

    it('should contain pagination link by initial state', () => {
      const activeLink = element.querySelector('a[active]');
      expect(activeLink).not.toBeNull();
      expect(activeLink?.textContent).toContain(element.current);
    });
  });

  describe('pagination navigation arrows', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-pagination>
          <a href="/"></a>
          <a href="/"></a>
        </oryx-pagination>`
      );
    });

    it('should contain disabled prev arrow for initial state', () => {
      const prevArrow = getShadowElementBySelector(element, 'a:first-child');
      expect(prevArrow).not.toBeNull();
      expect(prevArrow?.getAttribute('disabled')).not.toBeNull();
    });

    it('should contain not disabled next arrow for inital state', () => {
      const links = element.shadowRoot?.querySelectorAll('a');
      const nextPage = links?.[links.length - 1];
      expect(nextPage).not.toBeNull();
      expect(nextPage?.getAttribute('disabled')).toBeNull();
    });
  });

  describe('pagination pages should display only max links', () => {
    const size = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sizeParam = `&size=${size.length}`;

    beforeEach(async () => {
      element = await fixture(
        html`<oryx-pagination max=${size.length}>
          ${size.map((page) => {
            return html`<a href="/page=${page}${sizeParam}">${page}</a>`;
          })}
        </oryx-pagination>`
      );
    });

    size.forEach((page) => {
      it(`should display page ${page} link`, () => {
        const lastLink = element.querySelector(
          `a[href="/page=${page}${sizeParam}"]`
        );
        expect(lastLink).not.toBeNull();
        expect(lastLink?.textContent).toContain(page);
      });
    });
  });

  describe('display only max links', () => {
    const size = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    beforeEach(async () => {
      element = await fixture(
        html`<oryx-pagination max="5">
          ${size.map((page) => {
            return html`<a>${page}</a>`;
          })}
        </oryx-pagination>`
      );
    });

    size.forEach((page) => {
      it(`should active link ${page} page and maximum pagination elements 7`, async () => {
        element.current = page;
        await element.updateComplete;
        await elementUpdated(element);
        const activeLink = element.querySelector('a[active]');
        expect(activeLink).not.toBeNull();
        expect(activeLink?.textContent).toContain(page);
        /* We use "if" because in the state when we should
         * truncate pagination only from one side we should display
         * an element instead of a second truncated icon
         */
        if (
          element.current >= element.max &&
          element.current <= size.length - element.max + 1
        ) {
          expect(element.querySelectorAll('a[visible]').length).toBe(
            element.max + 2
          );
        } else {
          expect(element.querySelectorAll('a[visible]').length).toBe(
            element.max + 1
          );
        }
      });
    });
  });
});