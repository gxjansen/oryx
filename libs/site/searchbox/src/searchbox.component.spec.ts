import { fixture } from '@open-wc/testing-helpers';
import { ExperienceService } from '@spryker-oryx/experience';
import { createInjector, destroyInjector } from '@spryker-oryx/injector';
import '@spryker-oryx/testing';
import { html } from 'lit';
import { of } from 'rxjs';
import { SearchboxComponent, SiteSearchboxOptions } from '.';
import { MOCK_SUGGESTION_PROVIDERS } from '../../src/mocks';
import '../index';

const mockedOptions: SiteSearchboxOptions = {
  placeholder: 'placeholder',
};

const brokenOptions: SiteSearchboxOptions = {
  placeholder: '',
};

class MockEBService implements Partial<ExperienceService> {
  getOptions = vi.fn().mockReturnValue(of({}));
}

const query = 'pro';

describe('ProductPreviewComponent', () => {
  let element: SearchboxComponent;

  const hasControls = (): boolean => {
    return (
      element.renderRoot.querySelectorAll(
        `oryx-button[slot="suffix"], oryx-icon-button[slot="suffix"]
    `
      ).length === 2
    );
  };

  const update = async (): Promise<void> => {
    element.requestUpdate();
    await element.updateComplete;
  };

  const getInput = (): HTMLInputElement => {
    return element.renderRoot.querySelector('input') as HTMLInputElement;
  };

  const simulateTyping = async (query: string): Promise<void> => {
    const input = getInput();

    input.value = query;
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await update();
  };

  const hasResults = async (expectation = true): Promise<void> => {
    await update();

    const container = element.renderRoot.querySelector('[slot="option"]');

    if (expectation) {
      expect(container).not.toBeNull();
      return;
    }

    expect(container).toBeNull();
  };

  beforeEach(async () => {
    createInjector({
      providers: [
        {
          provide: ExperienceService,
          useClass: MockEBService,
        },
        ...MOCK_SUGGESTION_PROVIDERS,
      ],
    });
    element = await fixture(html`<site-searchbox></site-searchbox>`);
  });

  afterEach(() => {
    destroyInjector();
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('when query is not provided', () => {
    beforeEach(async () => {
      element = await fixture(html`<site-searchbox query=""></site-searchbox>`);

      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should not render result`s container', async () => {
      await hasResults(false);
    });

    it('should not render the controls', () => {
      expect(hasControls()).toBe(false);
    });
  });

  describe('when query is containing spaces only', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<site-searchbox query="     "></site-searchbox>`
      );

      vi.useFakeTimers();

      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should not render result`s container', async () => {
      await hasResults(false);
    });
  });

  describe('when query is to short', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<site-searchbox query="p"></site-searchbox>`
      );

      vi.useFakeTimers();

      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should not render result`s container', async () => {
      await hasResults(false);
    });

    it('should render the controls', () => {
      expect(hasControls()).toBe(true);
    });
  });

  describe('when query is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<site-searchbox query="prod"></site-searchbox>`
      );

      vi.useFakeTimers();

      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should render result`s container with results', async () => {
      await hasResults();
    });

    it('should render the controls', () => {
      expect(hasControls()).toBe(true);
    });

    it('should set `stretched` attr', async () => {
      expect(element.hasAttribute('stretched')).toBe(true);
    });
  });

  describe('when not found', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<site-searchbox query="abracadabra"></site-searchbox>`
      );

      vi.useFakeTimers();

      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);

      await update();
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should render `not found` container', async () => {
      expect(element.renderRoot.querySelector('[slot="empty"]')).not.toBeNull();
    });
  });

  describe('when typing a query string', () => {
    beforeEach(async () => {
      element = await fixture(html`<site-searchbox></site-searchbox>`);

      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should update the query param', async () => {
      await simulateTyping(query);

      expect(element.query).toBe(query);
    });

    it('should receive the results', async () => {
      await hasResults(false);

      await simulateTyping(query);
      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);

      await hasResults();
    });
  });

  describe('when container with result is scrolled', () => {
    beforeEach(async () => {
      element = await fixture(html`<site-searchbox></site-searchbox>`);

      vi.useFakeTimers();

      await simulateTyping(query);
      //debounce the typeahead event dispatching
      vi.advanceTimersByTime(301);

      await update();

      const scrollContainer = element.renderRoot.querySelector(
        '[slot="option"] > *'
      ) as HTMLDivElement;

      scrollContainer.scrollTop = 10;
      scrollContainer?.dispatchEvent(new CustomEvent('scroll'));

      //debounce onscroll event's callback dispatching
      vi.advanceTimersByTime(21);
    });

    afterEach(() => {
      vi.clearAllTimers();
    });

    it('should set scrolling-top attribute', () => {
      expect(element.hasAttribute('scrollable-top')).toBe(true);
    });
  });

  describe('when oryx.clear event dispatched', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<site-searchbox query="123"></site-searchbox>`
      );
    });

    it('should clear input value', () => {
      const input = element.renderRoot.querySelector(
        'input'
      ) as HTMLInputElement;
      element.dispatchEvent(new CustomEvent('oryx.clear', { bubbles: true }));

      expect(input.value).toBe('');
    });
  });

  describe('when oryx.close event is dispatched', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<site-searchbox query="123"></site-searchbox>`
      );
    });

    it('should close the dropdown', () => {
      const typeahead = element.renderRoot.querySelector(
        'oryx-typeahead'
      ) as HTMLElement;

      typeahead.setAttribute('open', '');

      element.dispatchEvent(new CustomEvent('oryx.close'));

      expect(typeahead.hasAttribute('open')).toBe(false);
    });
  });

  describe('when options provided', () => {
    describe('and data is correct', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<site-searchbox .options=${mockedOptions}></site-searchbox>`
        );
      });

      it('should apply placeholder to input', () => {
        const input = element.renderRoot.querySelector('input') as HTMLElement;

        expect(input.getAttribute('placeholder')).toBe(
          mockedOptions.placeholder
        );
      });
    });

    describe('and data is incorrect', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<site-searchbox .options=${brokenOptions}></site-searchbox>`
        );
      });

      it('should not apply placeholder from options to input', () => {
        const input = element.renderRoot.querySelector('input') as HTMLElement;

        expect(input.getAttribute('placeholder')).not.toBe(
          brokenOptions.placeholder
        );
      });
    });
  });

  describe('suggestion is provided partially', () => {
    describe('and there are links only', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <site-searchbox
            query="pro"
            .options=${{ productsCount: 0 }}
          ></site-searchbox>
        `);

        vi.useFakeTimers();

        //debounce the typeahead event dispatching
        vi.advanceTimersByTime(301);
      });

      afterEach(() => {
        vi.clearAllTimers();
      });

      it('should render only one section', () => {
        const sections = element.renderRoot.querySelectorAll(
          '[slot="option"] section'
        );
        expect(sections?.length).toBe(1);
      });
    });

    describe('and there are products only', () => {
      beforeEach(async () => {
        element = await fixture(html`
          <site-searchbox
            query="pro"
            .options=${{
              categoriesCount: 0,
              completionsCount: 0,
              cmsCount: 0,
            }}
          ></site-searchbox>
        `);

        vi.useFakeTimers();

        //debounce the typeahead event dispatching
        vi.advanceTimersByTime(301);
      });

      afterEach(() => {
        vi.clearAllTimers();
      });

      it('should render only one section', () => {
        const sections = element.renderRoot.querySelectorAll(
          '[slot="option"] section'
        );
        expect(sections?.length).toBe(1);
      });
    });
  });
});