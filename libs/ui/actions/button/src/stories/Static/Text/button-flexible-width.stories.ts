import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../../../.constants';

export default {
  title: `${storybookPrefix}/Actions/Button/Static/Text`,
} as Meta;

interface Props {
  disabled: boolean;
  loading: boolean;
}

const Template: Story<Props> = (): TemplateResult => {
  const renderButton = (): TemplateResult => {
    return html` <h1>Flexible widths</h1>
      <div class="button-component">
        <oryx-button type="text" size="large" style="width:100%">
          <button>large button (100%)</button>
        </oryx-button>
        <oryx-button type="text" size="medium" icon style="flex:0 0 50%">
          <a href="/">
            <oryx-icon type="rocket"></oryx-icon>
            medium anchor link with icon (50%)
          </a>
        </oryx-button>
        <oryx-button
          type="text"
          outline
          size="medium"
          style="width: 400px;margin-inline-start: auto"
        >
          <button>medium outline button (400px)</button>
        </oryx-button>
        <oryx-button type="text" size="small" style="flex:0 0 33%">
          <button disabled>
            <oryx-icon type="rocket"></oryx-icon>
            small disabled button (33%)
          </button>
        </oryx-button>
        <oryx-button type="text" size="small" loading style="flex: auto">
          <button class="chromatic-ignore">small loading button, auto</button>
        </oryx-button>
      </div>`;
  };

  return html`
    ${renderButton()}
    <style>
      .button-component {
        display: flex;
        flex-wrap: wrap;
        row-gap: 15px;
      }
    </style>
  `;
};

export const FlexibleWidth = Template.bind({});
