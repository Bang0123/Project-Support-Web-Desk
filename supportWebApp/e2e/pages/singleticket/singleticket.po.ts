import { browser, by, element } from 'protractor';

export class SingleTicketPage {
    getNoTicketH1Present() {
        return element(by.css('div[name="noticket"] h1')).isDisplayed();
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

    testChangeStatus() {
        element(by.cssContainingText('mat-option span', 'Igang')).click();
    }

    testChangePriority() {
        element(by.cssContainingText('mat-option span', 'Normal')).click();
    }

    getTicketAnswerFormPresent() {
        return element(by.css('div[name="answerinputs"]')).isDisplayed();
    }

    private rngText() {
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
}
