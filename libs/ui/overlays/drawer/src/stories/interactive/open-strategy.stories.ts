import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { DrawerComponent } from '../..';
import { storybookPrefix } from '../../../../../.constants';
import { Position } from '../../../../../utilities/model/common';
import { OverlaysDecorator, wait } from '../../../../../utilities/storybook';
import '../../index';
import { toggle } from './util';

export default {
  title: `${storybookPrefix}/Overlays/Drawer/Interactive`,
  decorators: [OverlaysDecorator],
} as Meta;

const Template: Story = (): TemplateResult => {
  return html`
    <button
      @click=${(): void => {
        toggle();
      }}
      data-testid="button"
    >
      open
    </button>
    <oryx-drawer position=${Position.END}>
      <div style="padding:20px;">Content</div>
    </oryx-drawer>
  `;
};

export const OpenStrategy = Template.bind({});

OpenStrategy.play = async (obj: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  const drawer = obj.canvasElement.querySelector(
    'oryx-drawer'
  ) as DrawerComponent;

  await wait(1000);
  userEvent.click(await within(obj.canvasElement).getByTestId('button'));
  await wait(500);
  expect(drawer.dialog?.open).toBeTruthy;
};