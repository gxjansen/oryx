import {
  Address,
  CheckoutDataService,
  CheckoutForm,
} from '@spryker-oryx/checkout';
import { ComponentMixin } from '@spryker-oryx/experience';
import { FormComponentInterface } from '@spryker-oryx/form';
import { resolve } from '@spryker-oryx/injector';
import { AddressService } from '@spryker-oryx/user';
import { i18n } from '@spryker-oryx/utilities/i18n';
import { asyncValue } from '@spryker-oryx/utilities/lit-rxjs';
import { html, LitElement, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';

export class CheckoutAddressComponent
  extends ComponentMixin()
  implements CheckoutForm
{
  protected checkoutDataService = resolve(CheckoutDataService);
  protected addressService = resolve(AddressService);

  @state()
  protected selectedAddress: Address | null = null;

  protected addresses$ = this.addressService.getAddresses();

  protected formRef: Ref<LitElement & FormComponentInterface> = createRef();

  protected getFormElement(): HTMLFormElement | null | undefined {
    return this.formRef.value?.getForm?.() as HTMLFormElement;
  }

  submit(report = false): boolean {
    const form = this.getFormElement();

    if (!form?.checkValidity() && !this.selectedAddress) {
      if (report) {
        form?.reportValidity();
      } else {
        this.checkoutDataService.setAddressDetails(null);
      }

      return false;
    }

    const data = form
      ? Object.fromEntries(new FormData(form).entries())
      : this.selectedAddress;

    this.checkoutDataService.setAddressDetails(data as unknown as Address);

    return true;
  }

  protected handleAddressFromList(e: CustomEvent): void {
    this.selectedAddress = e.detail.address;
  }

  protected override render(): TemplateResult {
    return html`${asyncValue(this.addresses$, (addresses) => {
      if (!addresses?.length) {
        return html`
          <p>${i18n('checkout.address-details')}</p>
          <oryx-address-form ${ref(this.formRef)}></oryx-address-form>
        `;
      }

      return html`
        <oryx-address-list
          .options=${{ selectable: true }}
          @oryx.address-change=${(e: CustomEvent): void =>
            this.handleAddressFromList(e)}
        ></oryx-address-list>
      `;
    })}`;
  }
}