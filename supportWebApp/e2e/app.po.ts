import { browser, by, element } from 'protractor';

export class AppPage {
  navigateToSite() {
    browser.waitForAngularEnabled(false);
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

  getTicketDataTableRowsPresent() {
    const ec = browser.ExpectedConditions;
    browser.wait(ec.visibilityOf(element(by.css('mat-table mat-row'))), 10000);
    return element(by.css('mat-table mat-row')).isDisplayed();
  }

  navigateToSingleTicketsPage() {
    const btn = element(by.css('a[name="ticket"]')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.urlContains('ticket'), 10000);
  }

  getNoTicketH1Present() {
    return element(by.css('div[name="noticket"] h1')).isDisplayed();
  }

  navigateToAllTicketsPage() {
    const btn = element(by.css('a[name="tickets"]')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.urlContains('tickets'), 10000);
  }

  getPageH1() {
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

  testFiltering() {
    const headerBtn = element(by.css('mat-table mat-header-row mat-header-cell div button'));
    const statustxt = element(by.css('mat-table mat-row mat-cell')).getText();
    headerBtn.click();
    const statustxt2 = element(by.css('mat-table mat-row mat-cell')).getText();
    if (statustxt !== statustxt2) {
      headerBtn.click();
      return true;
    } else {
      headerBtn.click();
      return false;
    }
  }

  clickToSeeTicketInRow() {
    const ec = browser.ExpectedConditions;
    browser.wait(ec.visibilityOf(element(by.css('mat-table mat-row'))), 10000);
    const btn = element(by.css('mat-table mat-row button')).click();
    browser.wait(ec.urlContains('ticket'), 10000);
  }

  getDisplayTicketDivPresent() {
    return element(by.css('div[name="displayticket"]')).isDisplayed();
  }

  getTicketSubjectPresent() {
    return element(by.css('div[name="header"] h3')).isDisplayed();
  }

  getTicketBodyPresent() {
    return element(by.css('h3[name="bodycontext"]')).isDisplayed();
  }

  getTicketMessagesPresent() {
    const ec = browser.ExpectedConditions;
    browser.wait(ec.visibilityOf(element(by.css('mat-card-content'))), 10000);
    return element(by.css('div[name="messagedir"] h3')).isDisplayed();
  }

  getTicketAnswerFormPresent() {
    return element(by.css('div[name="answerinputs"]')).isDisplayed();
  }

  rngText() {
    return Math.random().toString(36).substr(2, 5);
  }

  testAnswerFlowIntern() {
    const txtToSend = this.rngText();
    const txtArea = element(by.css('div[name="answerinputs"] textarea')).sendKeys(txtToSend);
    const intern = element(by.css('mat-radio-button[name="intern"]')).click();
    const sendbtn = element(by.css('button[name="answerbtn"]')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.visibilityOf(element(by.cssContainingText('mat-card-content p', txtToSend))), 10000);
    return element(by.cssContainingText('mat-card-content p', txtToSend)).isDisplayed();
  }

  testAnswerFlowExtern() {
    const txtToSend = this.rngText();
    const txtArea = element(by.css('div[name="answerinputs"] textarea')).sendKeys(txtToSend);
    const extern = element(by.css('mat-radio-button[name="extern"]')).click();
    const sendbtn = element(by.css('button[name="answerbtn"]')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.visibilityOf(element(by.cssContainingText('mat-card-content p', txtToSend))), 10000);
    return element(by.cssContainingText('mat-card-content p', txtToSend)).isDisplayed();
  }

  navigateToSearchPage() {
    const btn = element(by.css('a[name="search"]')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.urlContains('search'), 10000);
  }

  searchOptionsDisplayed() {
    const ticketid = element(by.css('input[name="ticketid"]')).isDisplayed();
    const requester = element(by.css('input[name="requester"]')).isDisplayed();
    const subject = element(by.css('input[name="subject"]')).isDisplayed();
    const body = element(by.css('input[name="body"]')).isDisplayed();
    const priority = element(by.css('mat-select[name="priority"]')).isDisplayed();
    const assignee = element(by.css('input[name="assignee"]')).isDisplayed();
    const datefrom = element(by.css('input[name="datefrom"]')).isDisplayed();
    const dateto = element(by.css('input[name="dateto"]')).isDisplayed();
    return ticketid && requester && subject && body && priority && assignee && datefrom && dateto;
  }

  getSearchForTicketText() {
    return element(by.css('p em')).getText();
  }

  searchForTicketIsPresent() {
    const assignee = element(by.css('input[name="assignee"]')).sendKeys('admin');
    const btn = element(by.className('mat-raised-button mat-primary')).click();
    const ec = browser.ExpectedConditions;
    browser.wait(ec.visibilityOf(element(by.css('mat-table mat-row'))), 10000);
    return element(by.css('mat-table mat-row')).isDisplayed();
  }
}
