import { LitElement } from 'lit';
import { queryFirstAssigned } from '../../utilities';

export class NoFormControlError {
  constructor() {
    return new Error('Form control was not found');
  }
}

/**
 * Returns the the form control for the given element.
 *
 * When there's no form control found, an `NoFormControlError` is thrown.
 */
export function getControl<
  T = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>(element: LitElement, selector = 'input, select, textarea'): T {
  const control = queryFirstAssigned<T>(element, {
    selector,
    flatten: true,
  });

  if (control === undefined) {
    throw new NoFormControlError();
  }

  return control;
}