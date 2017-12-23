import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToSite() {
    return browser.get('/');
  }

  getLoginFormText() {
    return element(by.css('h2')).getText();
  }

  loginFormPresent() {
    const usernameElement = element(by.id('inputEmail')).isDisplayed();
    const passwordElement = element(by.id('inputPassword')).isDisplayed();
    const buttonElement = element(by.className('mat-raised-button mat-primary')).isDisplayed();
    if (usernameElement && passwordElement) {
      return true;
    }
    return false;
  }

  navmenuLoginOptionPresent() {
    const navLogin = element(by.css('ul li a')).isDisplayed();
    if (navLogin) {
      return true;
    }
    return false;
  }

  actionLoginAndSeeHomePage() {
    const usernameElement = element(by.id('inputEmail')).sendKeys('admin@gmail.com');
    const passwordElement = element(by.id('inputPassword')).sendKeys('Admin01*');
    const btn = element(by.className('mat-raised-button mat-primary')).click();
    browser.waitForAngularEnabled(false);
    const ec = browser.ExpectedConditions;
    browser.wait(ec.urlContains('home'), 10000);
  }

  getHomePageh1Text() {
    return element(by.css('app-home h1')).getText();
  }

  getGreetingText() {
    return element(by.css('app-home p strong')).getText();
  }

  getNewTicketsTextPresent() {
    return element(by.css('div[name="newticks"] h3')).isDisplayed();
  }

  getNewTicketsNumberPresent() {
    return element(by.css('div[name="newticks"] p')).isDisplayed();
  }

  getAssignedTicketsTextPresent() {
    return element(by.css('div[name="yourticks"] h3')).isDisplayed();
  }

  getAssignedTicketsNumberPresent() {
    return element(by.css('div[name="yourticks"] p')).isDisplayed();
  }

  getAssignedTicketDataTable() {
    const ec = browser.ExpectedConditions;
    browser.wait(ec.visibilityOf(element(by.css('mat-table mat-row'))), 10000);
    return element(by.css('mat-table mat-row')).isDisplayed();
  }

  navigateToAllTicketsSite() {
    const btn = element(by.css('ul li a[name="tickets"]')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.urlContains('tickets'), 10000);
  }

  getAllTicketsH1() {
    return element(by.css('h1')).getText();
  }

  getOpenTicketsTextPresent() {
    return element(by.css('div[name="openticks"] h3')).isDisplayed();
  }

  getOpenTicketsNumberPresent() {
    return element(by.css('div[name="openticks"] p')).isDisplayed();
  }

  getCriticalTicketsTextPresent() {
    return element(by.css('div[name="criticalticks"] h3')).isDisplayed();
  }

  getCriticalTicketsNumberPresent() {
    return element(by.css('div[name="criticalticks"] p')).isDisplayed();
  }
}
