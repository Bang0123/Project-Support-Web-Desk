import { browser, by, element } from 'protractor';

export class HomePage {
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

}
