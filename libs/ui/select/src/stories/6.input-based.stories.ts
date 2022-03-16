import { storybookPrefix } from '../../../constant';
import '../../../option/src/index';
import '../index';
import { sideBySide, states } from './../../../utilities/storybook';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

export default {
  title: `${storybookPrefix}/form/Select`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return sideBySide(html`
    <oryx-select .options=${{ allowEmptyValue: false }}>
      <input placeholder="select something from the list" />
      ${states.map((state) => html`<oryx-option>${state}</oryx-option>`)}
    </oryx-select>
  `);
};

export const InputBased = Template.bind({});