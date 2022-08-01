import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import '../../../../../option/src';
import { sideBySide } from '../../../../../utilities/storybook';
import '../../index';

export default {
  title: `${storybookPrefix}/Form/Select/Static`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  const selectOptions = ['Red', 'Green', 'Blue'];

  return sideBySide(html`
    <oryx-select>
      <input placeholder="select something from the list" ?disabled=${true} />
      ${selectOptions.map(
        (state) =>
          html`<oryx-option value="val_${state}">${state}</oryx-option>`
      )}
    </oryx-select>
  `);
};

export const DisabledSelect = Template.bind({});