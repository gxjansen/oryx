export class HeaderFragment {
  getWrapper = () => cy.get('[uid="header"]');

  getContactLink = () => this.getWrapper().find('oryx-content-link').find('a');

  getCurrencySelector = () =>
    this.getWrapper().find('oryx-site-currency-selector');
  getCurrencyButton = () =>
    this.getCurrencySelector().find('oryx-button[slot="trigger"]');

  getLocaleSelector = () => this.getWrapper().find('oryx-site-locale-selector');
  getLocaleButton = () =>
    this.getLocaleSelector().find('oryx-button[slot="trigger"]');

  getLogo = () =>
    this.getWrapper().find('oryx-content-image').find('a[href="/"]');

  getUserSummary = () => cy.get('oryx-site-navigation-item:nth-of-type(1)');
  getUserSummaryHeading = () => this.getUserSummary().find('oryx-heading');
  getUserSummaryMenu = () => this.getUserSummary().find('oryx-dropdown');
  getOpenUserMenuButton = () =>
    this.getUserSummaryMenu().find('oryx-button').eq(0);
  getLogoutButton = () =>
    this.getUserSummaryMenu().find('oryx-auth-login-link');

  getCartSummary = () => cy.get('oryx-site-navigation-item:nth-of-type(2)');
  getCartCount = () => this.getCartSummary().find('mark');

  logout = () => {
    this.getUserSummary().click();
    this.getLogoutButton().click();
  };

  changeLocale = (locale: string, isHydrated = false) => {
    if (!isHydrated) {
      cy.hydrateElemenet('/assets/locale-selector.component-*.js', () => {
        this.getLocaleSelector().click();
      });
    }

    const selector = `oryx-option[value="${locale}"]`;

    this.getLocaleSelector().click();

    this.initProductsUpdateInterceptor();
    this.getLocaleSelector().find(selector).click();
    this.waitForProductsUpdate();
  };

  changeCurrency = (currency: string, isHydrated = false) => {
    if (!isHydrated) {
      cy.hydrateElemenet('/assets/currency-selector.component-*.js', () => {
        this.getCurrencyButton().click();
      });
    }

    const selector = `oryx-option[value="${currency}"]`;

    this.getCurrencyButton().click();

    this.initProductsUpdateInterceptor();
    this.getCurrencySelector().find(selector).click();
    this.waitForProductsUpdate();
  };

  private initProductsUpdateInterceptor() {
    cy.intercept({
      method: 'GET',
      url: /\/catalog-search.*|\/concrete-products\/.*/,
    }).as('productOrSearchRequests');
  }

  private waitForProductsUpdate() {
    cy.wait('@productOrSearchRequests');
  }
}