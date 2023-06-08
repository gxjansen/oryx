import { Address } from '@spryker-oryx/user';
import { mockNormalizedAddresses } from '@spryker-oryx/user/mocks';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../.constants';
import { AddressFormAttributes } from '../address-form.model';

const countries = ['DE', 'US', 'AT', 'PT', 'ES'];

export default {
  title: `${storybookPrefix}/Address Form`,
  args: {
    country: 'DE',
    enableDefaultShipping: false,
    enableDefaultBilling: false,
    fallbackCountry: 'DE',
  },
  argTypes: {
    country: {
      control: { type: 'select' },
      options: countries,
    },
    fallbackCountry: {
      control: { type: 'select' },
      options: countries,
    },
    address: {
      control: { type: 'select' },
      options: mockNormalizedAddresses.reduce(
        (acc, address) => ({
          ...acc,
          [address.id as string]: address,
        }),
        { empty: {} }
      ),
    },
  },
} as Meta;

interface Props extends AddressFormAttributes {
  address?: Address;
}

const Template: Story<Props> = (props): TemplateResult => {
  return html`<oryx-address-form
    .values=${props.address}
    .country="${props.country}"
    .enableDefaultShipping=${props.enableDefaultShipping}
    .enableDefaultBilling=${props.enableDefaultBilling}
    .fallbackCountry="${props.fallbackCountry}"
  ></oryx-address-form>`;
};

export const Demo = Template.bind({});