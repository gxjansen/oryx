import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import '../../index';
import { Props } from '../../stories/model';

export default {
  title: 'form/input/error',
} as Meta;

const Template: Story<Props> = ({
  value,
  errorMessage,
  disabled,
  readonly,
  placeholder,
  label,
}: Props): TemplateResult => {
  return html`
<oryx-input label=${label} .errorMessage=${errorMessage} >
    <input placeholder=${placeholder} .value=${value} ?disabled=${disabled} ?readonly=${readonly}></input>
</oryx-input>
  `;
};
export const ErrorMessages = Template.bind({});
ErrorMessages.args = {
  value: '',
  placeholder: 'Fill in some data...',
  disabled: false,
  readonly: false,
  errorMessage: 'Error validation text',
  label: 'label',
};