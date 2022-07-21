import { setUpMockProviders } from '@spryker-oryx/injector';
import {
  MOCK_CARD_PROVIDERS,
  MOCK_PRODUCT_PROVIDERS,
} from '@spryker-oryx/product/mocks';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { storybookPrefix } from '../../../../.constants';

export default {
  title: `${storybookPrefix}/Card/Static`,
  loaders: [setUpMockProviders(MOCK_CARD_PROVIDERS, MOCK_PRODUCT_PROVIDERS)],
} as unknown as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    <h4>With average rating</h4>
    <product-card sku="1"></product-card>

    <h4>Without average rating</h4>
    <product-card sku="5"></product-card>
  `;
};

export const AverageRating = Template.bind({});