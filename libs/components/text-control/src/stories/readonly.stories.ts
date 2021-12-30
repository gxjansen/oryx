import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import '../index';
import { Props } from './model';

export default {
  title: 'TextControl',
} as Meta;

const Template: Story<Props> = ({
  readonly,
  disabled,
}: Props): TemplateResult =>
  html`
<oryx-text-control label="Label">
  <oryx-icon slot="prefix" type="search"></oryx-icon>
  <input placeholder="Placeholder.." ?readonly=${readonly} ?disabled=${disabled}></input>
</oryx-text-control>
`;
export const ReadonlyControl = Template.bind({});
ReadonlyControl.args = {
  readonly: true,
  disabled: false,
};