import { TestCustomerData } from '../types/user.type';
import { CartPage } from './page_objects/cart.page';
import { LoginPage } from './page_objects/login.page';
import { SCCOSApi } from './sccos_api/sccos.api';

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      loginApi(): Chainable<void>;
      goToCheckout(): Chainable<void>;
      goToCheckoutAsGuest(): Chainable<void>;
      customerCartsCleanup(sccosApi: SCCOSApi, user: TestCustomerData): void;
      customerAddressesCleanup(
        sccosApi: SCCOSApi,
        user: TestCustomerData
      ): void;
      disableAnimations(): void;
      checkCurrencyFormatting(locale: string): void;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.fixture<TestCustomerData>('test-customer').then((customer) => {
    const loginPage = new LoginPage();

    loginPage.visit();

    cy.intercept('/customers/DE--**').as('profileRequest');
    loginPage.loginForm.login(customer);
    cy.wait('@profileRequest');

    loginPage.header.getUserSummaryHeading().should('contain', customer.name);
  });
});

Cypress.Commands.add('loginApi', () => {
  cy.fixture<TestCustomerData>('test-customer').then((customer) => {
    const api = new SCCOSApi();

    api.token.post(customer).then((res) => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          'oryx.oauth-state',
          '{"authorizedBy":"spryker"}'
        );
        win.localStorage.setItem('oryx.oauth-token', JSON.stringify(res.body));
      });
    });
  });
});

Cypress.Commands.add('goToCheckout', () => {
  const cartPage = new CartPage();

  cy.intercept('/customers/DE--**/carts?**').as('cartsRequest');
  cartPage.visit();
  cy.wait('@cartsRequest');

  cy.intercept('/customers/*/addresses').as('addressesRequest');
  cartPage.checkout();
  cy.wait('@addressesRequest');
});

Cypress.Commands.add('goToCheckoutAsGuest', () => {
  const cartPage = new CartPage();

  cy.intercept('/guest-carts?**').as('cartsRequest');
  cartPage.visit();
  cy.wait('@cartsRequest');

  cartPage.checkout();
});

Cypress.Commands.add(
  'customerCartsCleanup',
  (sccosApi: SCCOSApi, user: TestCustomerData) => {
    sccosApi.carts.customersGet(user.id).then((response) => {
      const carts = response.body.data;

      // remove last cart id from the list
      // because it can't be deleted
      carts.pop();

      carts.map((cart) => cart.id).forEach((id) => sccosApi.carts.delete(id));
    });

    // create new, empty cart
    sccosApi.carts.post();
  }
);

Cypress.Commands.add(
  'customerAddressesCleanup',
  (sccosApi: SCCOSApi, user: TestCustomerData) => {
    sccosApi.addresses.get(user.id).then((response) => {
      const addresses = response.body.data;

      addresses
        .map((address) => address.id)
        .forEach((id) => sccosApi.addresses.delete(user.id, id));
    });
  }
);

Cypress.Commands.add('disableAnimations', () => {
  cy.window().then((window) => {
    const document = window.document;
    const root = document.querySelector('oryx-app') as any;

    root.style.setProperty('--oryx-transition-time', 0);
    root.style.setProperty('--oryx-transition-time-medium', 0);
    root.style.setProperty('--oryx-transition-time-long', 0);
  });
});

Cypress.Commands.add(
  'checkCurrencyFormatting',
  { prevSubject: true },
  (subject, locale: string) => {
    switch (locale) {
      case 'en':
        return cy
          .wrap(subject)
          .invoke('text')
          .then((price) => {
            const currencySymbolPosition = price.indexOf('€');
            expect(currencySymbolPosition).to.eq(0);
          });
      case 'de':
        return cy
          .wrap(subject)
          .invoke('text')
          .then((price) => {
            const currencySymbolPosition = price.indexOf('€');
            expect(currencySymbolPosition).to.eq(price.length - 1);
          });
      default:
        throw new Error(`locale "${locale}" is not supported`);
    }
  }
);
