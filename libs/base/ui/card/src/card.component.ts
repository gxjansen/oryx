import { html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { CardType } from './card.model';
import { styles } from './card.styles';

export class CardComponent extends LitElement {
  static styles = styles;

  @property({ reflect: true }) type?: CardType;

  @property() header?: string;

  protected override render(): TemplateResult {
    return html`
      <slot name="header">
        <oryx-heading>
          <h5>${this.header}</h5>
        </oryx-heading>
      </slot>
      <slot part="body"></slot>
      <slot name="footer"></slot>
    `;
  }
}