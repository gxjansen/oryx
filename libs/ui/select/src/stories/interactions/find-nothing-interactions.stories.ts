import { expect } from '@storybook/jest';
import { userEvent } from '@storybook/testing-library';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.storybook/constant';
import '../../../../option/src/index';
import { FilterStrategyType } from '../../../../typeahead';
import { states } from '../../../../utilities/storybook';
import '../../index';
import { SelectComponent } from '../../index';

export default {
  title: `${storybookPrefix}/form/Select/Interaction`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <oryx-select .filterStrategy=${FilterStrategyType.CONTAINS}>
      <input placeholder="select something from the list" />
      ${states.map((state) => html`<oryx-option>${state}</oryx-option>`)}
    </oryx-select>
  `;
};

export const FindNothing = Template.bind({});

FindNothing.play = async (obj: {
  args: unknown;
  canvasElement: HTMLElement;
}): Promise<void> => {
  const component = obj.canvasElement.querySelector(
    'oryx-select'
  ) as SelectComponent;
  const popover = component.shadowRoot?.querySelector('oryx-popover');
  const input = component.querySelector('input') as HTMLInputElement;
  userEvent.clear(input);
  await userEvent.type(input, 'nothing', { delay: 500 });
  expect(input.value).toBe('nothing');
  expect(popover?.textContent?.trim()).toEqual('No results found');
};