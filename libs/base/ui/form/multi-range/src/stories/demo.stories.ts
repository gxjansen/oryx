import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.constants';
import { MultiRangeProperties } from '../multi-range.model';

export default {
  title: `${storybookPrefix}/Form/MultiRange`,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
} as Meta;

const Template: Story<MultiRangeProperties> = ({
  disabled,
  min,
  max,
  minValue,
  maxValue,
  step,
}: MultiRangeProperties): TemplateResult => {
  return html`
    <oryx-multi-range
      .min="${min}"
      .max="${max}"
      .minValue="${minValue}"
      .maxValue="${maxValue}"
      .step="${step}"
      ?disabled="${disabled}"
    >
    </oryx-multi-range>
  `;
};

export const MultiRangeDemo = Template.bind({});
MultiRangeDemo.args = {
  disabled: false,
  min: 0,
  max: 100,
  minValue: 20,
  maxValue: 70,
  step: 1,
};
