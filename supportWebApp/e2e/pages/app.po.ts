import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToSite() {
    browser.waitForAngularEnabled(false);
    return browser.get('/');
  }

  getPageH1() {
    return element(by.css('h1')).getText();
  }

  getTicketDataTableRowsPresent() {
    const ec = browser.ExpectedConditions;
    browser.wait(ec.visibilityOf(element(by.css('mat-table mat-row'))), 10000);
    return element(by.css('mat-table mat-row')).isDisplayed();
  }

  navigateToAllTicketsPage() {
    const btn = element(by.css('a[name="tickets"]')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.urlContains('tickets'), 10000);
  }

  navigateToSingleTicketsPage() {
    const btn = element(by.css('a[name="ticket"]')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.urlContains('ticket'), 10000);
  }

  navigateToSearchPage() {
    const btn = element(by.css('a[name="search"]')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.urlContains('search'), 10000);
  }
}
