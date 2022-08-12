import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import { generateVariantsMatrix } from '../../../../../utilities';
import {
  VariantsGroup,
  variantsGroupTemplate,
} from '../../../../../utilities/storybook/variants/variants-group';
import '../../form-control';
import {
  getInputVariants,
  InputVariantOptions,
  setInputMutationObserver,
} from './common';

export default {
  title: `${storybookPrefix}/Form/Input/Static`,
} as Meta;

const groups: VariantsGroup<InputVariantOptions>[] = [
  {
    title: 'Standard label',
    options: {
      floatLabel: false,
    },
  },
  {
    title: 'Floating label',
    options: {
      floatLabel: true,
    },
  },
];

const Template: Story = (): TemplateResult => {
  return html`
    ${groups.map((group, index) =>
      variantsGroupTemplate(
        () => html`
          ${generateVariantsMatrix(
            [
              ...getInputVariants(group.options),
              ...getInputVariants({ value: 0, ...group.options }),
            ],
            ({
              options: {
                floatLabel,
                errorMessage,
                isDisabled,
                className,
                value,
              },
            }) => html`
              <oryx-input
                label="Label"
                ?floatLabel=${floatLabel}
                errormessage=${errorMessage}
              >
                <input
                  placeholder="Placeholder"
                  type="number"
                  value=${value}
                  ?disabled=${isDisabled}
                  class=${className}
                />
              </oryx-input>
            `
          )}
        `,
        { title: group.title, addSeparator: index < groups.length - 1 }
      )
    )}

    <script>
      ${setInputMutationObserver()};
    </script>
  `;
};
export const NumberField = Template.bind({});
