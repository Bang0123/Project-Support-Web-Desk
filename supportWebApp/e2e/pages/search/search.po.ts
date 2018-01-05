import { browser, by, element } from 'protractor';

export class SearchPage {
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
