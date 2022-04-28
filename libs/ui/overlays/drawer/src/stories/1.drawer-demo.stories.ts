import { Meta, Story } from '@storybook/web-components';
import { LitElement, TemplateResult } from 'lit';
import { html } from 'lit-html';
import { customElement, property, state } from 'lit/decorators.js';
import { DrawerProperties, DrawerService, DrawerType } from '..';
import { storybookPrefix } from '../../../../.storybook/constant';
import { Position } from '../../../../utilities/model/common';
import '../index';

const service = new DrawerService();

@customElement('dynamic-component')
class DynamicComponent extends LitElement {
  @state()
  inProgress = false;
  @state()
  currentId = '';
  @property({ type: Object })
  props?: DrawerProperties;

  handleOpen(id: string): void {
    this.inProgress = true;
    this.currentId = id;
    service.toggle({
      selector: '#drawer',
      force: true,
      parent: this,
    });

    setTimeout(() => {
      this.inProgress = false;
    }, 1000);
  }

  render(): TemplateResult {
    return html`
      <style>
        input {
          width: 100%;
          margin-bottom: 20px;
        }
      </style>
      <oryx-drawer
        id="drawer"
        position=${this.props?.position}
        type=${this.props?.type}
        ?maximize=${this.props?.maximize}
        ?not-closable=${this.props?.notClosable}
        ?not-resizable=${this.props?.notResizable}
        ?open=${this.props?.open}
      >
        <div style="padding:20px">
          <input placeholder="Will be focused when no control buttons" />

          ${this.inProgress
            ? html`Loading...`
            : html`
                <p>${this.currentId ? `selected id: ${this.currentId}` : ''}</p>
                ${[...Array(20)].map(() => html`<p>Primary drawer content</p>`)}
              `}
        </div>
      </oryx-drawer>
    `;
  }
}

export default {
  title: `${storybookPrefix}/Overlays/Drawer`,
} as Meta;
const Template: Story<DrawerProperties> = (
  props: DrawerProperties
): TemplateResult => {
  const open = (id: string): void => {
    (document.querySelector('#element') as DynamicComponent).handleOpen(id);
  };

  return html`
    <style>
      button {
        display: block;
        margin: 0 0 20px;
      }
    </style>
    <button class="button" @click=${(): void => open('1')}>
      details id: 1
    </button>

    <button class="button" @click=${(): void => open('2')}>
      details id: 2
    </button>

    <button class="button" @click=${(): void => open('3')}>
      details id: 3
    </button>

    <dynamic-component .props=${props} id="element"></dynamic-component>

    <div>${[...Array(30)].map(() => html`<p>main content</p>`)}</div>
  `;
};

export const DrawerDemo = Template.bind({});
DrawerDemo.args = {
  open: false,
  maximize: false,
  notClosable: false,
  notResizable: false,
  type: DrawerType.PRIMARY,
  position: Position.END,
};
DrawerDemo.argTypes = {
  open: {
    type: 'boolean',
  },
  maximize: {
    type: 'boolean',
  },
  notClosable: {
    type: 'boolean',
  },
  notResizable: {
    type: 'boolean',
  },
  type: {
    options: Object.values(DrawerType),
    control: { type: 'radio' },
  },
  position: {
    options: Object.values(Position),
    control: { type: 'radio' },
  },
};