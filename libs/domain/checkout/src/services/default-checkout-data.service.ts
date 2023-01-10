import { StorageService, StorageType } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import {
  Address,
  addressCheckoutStorageKey,
  contactCheckoutStorageKey,
  ContactDetails,
  guestCheckoutStorageKey,
  paymentCheckoutStorageKey,
  PaymentMethod,
  Shipment,
  shipmentCheckoutStorageKey,
} from '../models';
import { CheckoutDataService } from './checkout-data.service';

export class DefaultCheckoutDataService implements CheckoutDataService {
  constructor(protected storage = inject(StorageService)) {
    this.getPersistedData();
  }

  protected isGuestCheckout$ = new ReplaySubject<boolean>();
  protected contactDetails$ = new BehaviorSubject<ContactDetails | null>(null);
  protected addressDetails$ = new BehaviorSubject<Address | null>(null);
  protected shipmentDetails$ = new BehaviorSubject<Shipment | null>(null);
  protected paymentDetails$ = new BehaviorSubject<PaymentMethod | null>(null);

  isGuestCheckout(): Observable<boolean> {
    return this.isGuestCheckout$;
  }

  setIsGuestCheckout(state = true): Observable<unknown> {
    this.isGuestCheckout$.next(state);

    if (state) {
      this.storage.set(
        guestCheckoutStorageKey,
        guestCheckoutStorageKey,
        StorageType.SESSION
      );
    } else {
      this.clearCheckoutData();
    }

    return this.isGuestCheckout$;
  }

  protected clearCheckoutData(): void {
    this.contactDetails$.next(null);
    this.addressDetails$.next(null);
    this.shipmentDetails$.next(null);
    this.paymentDetails$.next(null);
    this.storage.remove(guestCheckoutStorageKey, StorageType.SESSION);
    this.storage.remove(shipmentCheckoutStorageKey, StorageType.SESSION);
    this.storage.remove(paymentCheckoutStorageKey, StorageType.SESSION);
    this.storage.remove(contactCheckoutStorageKey, StorageType.SESSION);
    this.storage.remove(addressCheckoutStorageKey, StorageType.SESSION);
  }

  getContactDetails(): Observable<ContactDetails | null> {
    return this.contactDetails$;
  }

  setContactDetails(contactDetails: ContactDetails | null): void {
    this.contactDetails$.next(contactDetails);
    this.storage.set(
      contactCheckoutStorageKey,
      contactDetails,
      StorageType.SESSION
    );
  }

  getAddressDetails(): Observable<Address | null> {
    return this.addressDetails$;
  }

  setAddressDetails(addressDetails: Address | null): void {
    this.addressDetails$.next(addressDetails);
    this.storage.set(
      addressCheckoutStorageKey,
      addressDetails,
      StorageType.SESSION
    );
  }

  getShipmentDetails(): Observable<Shipment | null> {
    return this.shipmentDetails$;
  }

  setShipmentDetails(shipmentDetails: Shipment | null): void {
    this.shipmentDetails$.next(shipmentDetails);
    this.storage.set(
      shipmentCheckoutStorageKey,
      shipmentDetails,
      StorageType.SESSION
    );
  }

  getPaymentDetails(): Observable<PaymentMethod | null> {
    return this.paymentDetails$;
  }

  setPaymentDetails(paymentDetails: PaymentMethod | null): void {
    this.paymentDetails$.next(paymentDetails);
    this.storage.set(
      paymentCheckoutStorageKey,
      paymentDetails,
      StorageType.SESSION
    );
  }

  protected getPersistedData(): void {
    this.storage
      .get<string | null>(guestCheckoutStorageKey, StorageType.SESSION)
      .subscribe((isGuestCheckout) =>
        this.isGuestCheckout$.next(!!isGuestCheckout)
      );
    this.storage
      .get<Shipment | null>(shipmentCheckoutStorageKey, StorageType.SESSION)
      .subscribe((shipment) => this.shipmentDetails$.next(shipment));
    this.storage
      .get<PaymentMethod | null>(paymentCheckoutStorageKey, StorageType.SESSION)
      .subscribe((paymentMethod) => this.paymentDetails$.next(paymentMethod));
    this.storage
      .get<ContactDetails | null>(
        contactCheckoutStorageKey,
        StorageType.SESSION
      )
      .subscribe((contactDetails) => this.contactDetails$.next(contactDetails));
    this.storage
      .get<Address | null>(addressCheckoutStorageKey, StorageType.SESSION)
      .subscribe((addressDetails) => this.addressDetails$.next(addressDetails));
  }
}