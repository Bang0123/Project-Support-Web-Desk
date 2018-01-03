import { browser, by, element } from 'protractor';
export class TicketsPage {
    getOpenTicketsTextPresent() {
        return element(by.css('div[name="openticks"] h3'))
            .isDisplayed();
    }

    getOpenTicketsNumberPresent() {
        return element(by.css('div[name="openticks"] p'))
            .isDisplayed();
    }

    getCriticalTicketsTextPresent() {
        return element(by.css('div[name="criticalticks"] h3'))
            .isDisplayed();
    }

    getCriticalTicketsNumberPresent() {
        return element(by.css('div[name="criticalticks"] p'))
            .isDisplayed();
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
}
