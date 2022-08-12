import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../.constants';
import {
  extendVariants,
  generateVariantsMatrix,
} from '../../../../../utilities';
import { variantsGroupTemplate } from '../../../../../utilities/storybook/variants/variants-group';
import { basePasswordInputVariants, groups } from './common';

export default {
  title: `${storybookPrefix}/Form/Password/Static`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`
    ${groups.map((group, index) =>
      variantsGroupTemplate(
        () => html`
          ${generateVariantsMatrix(
            [
              ...extendVariants(basePasswordInputVariants, {
                options: {
                  value: 'Change123$',
                  ...group.options,
                },
              }),
            ],
            ({ options: { floatLabel, disabled, value, visible } }) => html`
              <oryx-password-input
                label="Label"
                ?floatLabel=${floatLabel}
                ?visible=${visible}
              >
                <input
                  type=${visible ? 'text' : 'password'}
                  value=${value}
                  placeholder="Placeholder..."
                  ?disabled=${disabled}
                />
              </oryx-password-input>
            `
          )}
        `,
        { title: group.title, addSeparator: index < groups.length - 1 }
      )
    )}
  `;
};

export const Variants = Template.bind({});
