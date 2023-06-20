import { Icons } from '@spryker-oryx/ui/icon';
import { html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { LinkComponentAttributes, LinkType } from './link.model';
import { linkStyles } from './link.styles';

export class LinkComponent
  extends LitElement
  implements LinkComponentAttributes
{
  static styles = linkStyles;

  @property({ reflect: true, attribute: 'link-type' }) linkType?: LinkType;
  @property({ type: Boolean, reflect: true }) disabled?: boolean;
  @property({ reflect: true }) icon?: Icons | string;
  @property({ reflect: true }) multiLine?: boolean;

  protected render(): TemplateResult {
    return html`
      <slot name="icon">
        ${when(
          this.icon,
          () => html`<oryx-icon .type=${this.icon}></oryx-icon>`
        )}
      </slot>
      <slot></slot>
    `;
  }
}
