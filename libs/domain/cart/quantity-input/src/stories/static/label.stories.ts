import { storybookDefaultViewports } from '@spryker-oryx/ui/utilities';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.constants';

export default {
  title: `${storybookPrefix}/Quantity input/Static`,
} as Meta;

const Template: Story = (): TemplateResult => {
  return html`
    <p>Without label</p>
    <oryx-cart-quantity-input min=${0} value=${1}></quantity-input>

    <p>With label</p>
    <oryx-cart-quantity-input min=${0} value=${1} label="Quantity"></quantity-input>

    <p>Long text</p>
    <oryx-cart-quantity-input
      min=${0}
      value=${1}
      label="Long label text content for example"
    ></quantity-input>
  `;
};
export const Label = Template.bind({});

Label.parameters = {
  chromatic: {
    delay: 3000,
    viewports: [
      storybookDefaultViewports.mobile.min,
      storybookDefaultViewports.desktop.min,
    ],
  },
};