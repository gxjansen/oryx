import { resolve } from '@spryker-oryx/di';
import { ContentMixin } from '@spryker-oryx/experience';
import { FormMixin, FormRenderer, formStyles } from '@spryker-oryx/form';
import { hydratable } from '@spryker-oryx/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { fields } from './contact-form.model';
import { styles } from './contact-form.styles';

@hydratable(['mouseover', 'focusin'])
export class userContactFormComponent extends FormMixin(
  ContentMixin(LitElement)
) {
  static styles = [formStyles, styles];

  protected fieldRenderer = resolve(FormRenderer);

  protected override render(): TemplateResult {
    return html`<form>${this.fieldRenderer.buildForm(fields)}</form>`;
  }
}