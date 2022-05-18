import { expect } from '@storybook/jest';
import { userEvent } from '@storybook/testing-library';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import '../../../../../option/src';
import { FilterStrategyType } from '../../../../../search/typeahead';
import { states } from '../../../../../utilities/storybook';
import '../../index';
import { SelectComponent } from '../../index';

export default {
  title: `${storybookPrefix}/Form/Select/Interaction`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <oryx-select .filterStrategy=${FilterStrategyType.START_OF_WORD}>
      <input placeholder="select something from the list" />
      ${states.map((state) => html`<oryx-option>${state}</oryx-option>`)}
    </oryx-select>
  `;
};

export const FilterByWord = Template.bind({});

FilterByWord.play = async (obj: {
  args: unknown;
  canvasElement: HTMLElement;
}): Promise<void> => {
  const component = obj.canvasElement.querySelector(
    'oryx-select'
  ) as SelectComponent;
  const input = component.querySelector('input') as HTMLInputElement;
  userEvent.clear(input);
  await userEvent.type(input, 'CALIFORNIA', { delay: 500 });
  expect(input.value).toBe('California');
  await new Promise((r) => setTimeout(r, 500));
  userEvent.click(input);
};
