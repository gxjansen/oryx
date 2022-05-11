import { expect } from '@storybook/jest';
import { userEvent } from '@storybook/testing-library';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.storybook/constant';
import '../../../../../option/src';
import { states } from '../../../../../utilities/storybook';
import { FilterStrategyType } from '../../../../typeahead';
import '../../index';
import { SelectComponent } from '../../index';

export default {
  title: `${storybookPrefix}/Form/Select/Interaction`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <oryx-select .filterStrategy=${FilterStrategyType.START_WITH}>
      <input placeholder="select something from the list" />
      ${states.map((state) => html`<oryx-option>${state}</oryx-option>`)}
    </oryx-select>
  `;
};

export const FilterStart = Template.bind({});

FilterStart.play = async (obj: {
  args: unknown;
  canvasElement: HTMLElement;
}): Promise<void> => {
  const component = obj.canvasElement.querySelector(
    'oryx-select'
  ) as SelectComponent;
  const input = component.querySelector('input') as HTMLInputElement;
  userEvent.clear(input);
  await userEvent.type(input, 'alabama', { delay: 300 });
  expect(input.value).toBe('Alabama');
  await new Promise((r) => setTimeout(r, 300));
  userEvent.click(input);
};