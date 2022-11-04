import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../.constants';

export default {
  title: `${storybookPrefix}/Login/Static`,
} as unknown as Meta;

const Template: Story = (): TemplateResult => {
  return html`
    <style>
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 30px;
      }
      h3 {
        grid-row: 1;
      }
      checkout-login {
        --oryx-layout-gap: 30px;
        align-items: stretch;
      }
    </style>

    <div class="row">
      <h3>With guest</h3>
      <checkout-login></checkout-login>
      <h3>Without guest</h3>
      <checkout-login .options=${{ disableGuest: true }}></checkout-login>
    </div>
  `;
};

export const LoginVariation = Template.bind({});
