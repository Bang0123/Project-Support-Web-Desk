import { browser, by, element } from 'protractor';

export class LoginPage {
    getLoginFormText() {
        return element(by.css('h2')).getText();
    }

    loginFormPresent() {
        const usernameElement = element(by.id('inputEmail')).isDisplayed();
        const passwordElement = element(by.id('inputPassword')).isDisplayed();
        const buttonElement = element(by.className('mat-raised-button mat-primary')).isDisplayed();
        return usernameElement && passwordElement;
    }

    navmenuLoginOptionPresent() {
        return element(by.css('ul li a')).isDisplayed();
    }

    actionLoginAndSeeHomePage() {
        const usernameElement = element(by.id('inputEmail')).sendKeys('admin@gmail.com');
        const passwordElement = element(by.id('inputPassword')).sendKeys('Admin01*');
        const btn = element(by.className('mat-raised-button mat-primary')).click();
        const ec = browser.ExpectedConditions;
        browser.wait(ec.urlContains('home'), 10000);
    }
}
