import { resolve } from '@spryker-oryx/di';
import { LocaleService } from '@spryker-oryx/i18n';
import { SiteNavigationItemComponent } from '@spryker-oryx/site/navigation-item';
import { IconTypes } from '@spryker-oryx/ui/icon';
import { ModalComponent } from '@spryker-oryx/ui/modal';
import { asyncState, I18nMixin, valueType } from '@spryker-oryx/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { pickingListsHeaderComponentStyles } from './picking-lists-header.styles';

export class PickingListsHeaderComponent extends I18nMixin(LitElement) {
  static styles = pickingListsHeaderComponentStyles;

  protected localeService = resolve(LocaleService);

  @asyncState()
  protected date = valueType(this.localeService.formatDate(Date.now()));

  protected onSearch(e: KeyboardEvent): void {
    const value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('oryx.search', {
        detail: {
          search: value,
          open: true,
        },
      })
    );
  }

  protected onToggleSearch(open: boolean): void {
    this.dispatchEvent(
      new CustomEvent('oryx.search', {
        detail: {
          search: '',
          open,
        },
      })
    );
  }

  protected onUpdatingData(): void {
    this.shadowRoot
      ?.querySelector<SiteNavigationItemComponent>('oryx-site-navigation-item')
      ?.shadowRoot?.querySelector<ModalComponent>('oryx-modal')
      ?.toggleAttribute('open', false);
  }

  protected override render(): TemplateResult {
    return html`
      <oryx-heading>
        <h4>
          ${this.i18n('picking.header.pick-lists-<date>', { date: this.date })}
        </h4>
      </oryx-heading>

      <oryx-search
        backIcon=${IconTypes.Back}
        xs-floated
        @oryx.open=${(): void => this.onToggleSearch(true)}
        @oryx.close=${(): void => this.onToggleSearch(false)}
      >
        <input
          .placeholder=${this.i18n('picking.header.order-ID')}
          @input=${this.onSearch}
        />
      </oryx-search>

      <oryx-site-navigation-item
        uid="user-profile"
        @oryx.close=${() => this.onUpdatingData()}
        .options=${{
          icon: IconTypes.User,
          triggerType: 'icon',
          contentBehavior: 'modal',
          label: this.i18n('oryx.picking.account'),
        }}
      ></oryx-site-navigation-item>
    `;
  }
}