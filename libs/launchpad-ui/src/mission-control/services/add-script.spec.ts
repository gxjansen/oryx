import { removeElement } from '@spryker-oryx/typescript-utils/tests-helpers';
import { addScript } from './add-script';

describe('addScript', () => {
  afterEach(() => {
    removeElement('script[src="my-path/path.js"]');
  });

  it('should attach the script to the dom properly', () => {
    addScript('my-path/path.js');

    expect('script[src="my-path/path.js"]').toBeInDOM();
  });

  describe('if there are extra attributes', () => {
    beforeEach(() => {
      addScript('my-path/path.js', {
        type: 'module',
      });
    });

    it('should add them to the element', () => {
      const el = document.querySelector('script[src="my-path/path.js"]');

      expect(el?.getAttribute('type')).toBe('module');
    });
  });
});
