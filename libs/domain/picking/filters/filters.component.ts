import { resolve } from '@spryker-oryx/di';
import { FormRenderer } from '@spryker-oryx/form';
import {
  defaultSortingQualifier,
  PickingListQualifierSortBy,
  PickingListService,
  SortableQualifier,
} from '@spryker-oryx/picking';
import { I18nMixin, signal } from '@spryker-oryx/utilities';
import { html, LitElement, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { map } from 'rxjs';
import { getFilterFields } from './filters.model';
import { filtersComponentStyles } from './filters.styles';

export class FiltersComponent extends I18nMixin(LitElement) {
  static styles = filtersComponentStyles;

  @property({ type: Boolean, reflect: true }) open = false;

  @query('form')
  protected form?: HTMLFormElement;

  protected fieldRenderer = resolve(FormRenderer);
  protected pickingListService = resolve(PickingListService);

  protected $selectedSortingValue = signal(
    this.pickingListService.getSortingQualifier().pipe(map(this.formatValue)),
    { initialValue: this.formatValue(defaultSortingQualifier) }
  );

  protected formatValue(
    quantifier: SortableQualifier<PickingListQualifierSortBy>
  ): string {
    return `${quantifier.sortBy}.${quantifier.sortDesc ? 'desc' : 'asc'}`;
  }

  protected onSubmit(e: Event): void {
    e.preventDefault();

    const { sortBy: _sortBy } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement).entries()
    );
    const [sortBy, sort] = (_sortBy as string).split('.');

    this.pickingListService.setSortingQualifier({
      sortBy: sortBy as PickingListQualifierSortBy,
      sortDesc: sort !== 'asc',
    });

    this.open = false;
  }

  protected onReset(): void {
    this.pickingListService.setSortingQualifier(defaultSortingQualifier);

    this.onClose();
  }

  protected onClose(): void {
    this.open = false;
    this.form?.reset();
  }

  protected onApply(event: Event): void {
    if (event instanceof KeyboardEvent && event.key !== 'Enter') return;
    event.preventDefault();

    //For safari 15- and other old browsers
    if (!this.form?.requestSubmit) {
      this.form?.submit();
      return;
    }

    this.form.requestSubmit();
  }

  protected override render(): TemplateResult {
    return html`
      <oryx-modal
        ?open=${this.open}
        enableCloseButtonInHeader
        enableNavigateBack
        enableFooter
        @oryx.back=${this.onReset}
        @oryx.close=${this.onClose}
      >
        <oryx-heading slot="heading" as-sm="h2">
          <h4>${this.i18n('picking.filter.sort')}</h4>
        </oryx-heading>

        <oryx-button slot="navigate-back" type="text">
          <button>${this.i18n('picking.filter.reset')}</button>
        </oryx-button>

        <form @submit=${this.onSubmit} @keydown=${this.onApply}>
          ${this.fieldRenderer.buildForm(getFilterFields(), {
            sortBy: this.$selectedSortingValue(),
          })}
        </form>

        <oryx-button slot="footer">
          <button @click=${this.onApply}>
            ${this.i18n('picking.filter.apply')}
          </button>
        </oryx-button>
      </oryx-modal>
    `;
  }
}