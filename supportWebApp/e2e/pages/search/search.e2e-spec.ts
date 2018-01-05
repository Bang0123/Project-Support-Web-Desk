import { AppPage } from '../app/app.po';
import { LoginPage } from '../login/login.po';
import { SearchPage } from './search.po';

describe('Support Web Desk searchpage test', () => {
    let apppage: AppPage;
    let loginpage: LoginPage;
    let searchpage: SearchPage;

    beforeEach(() => {
        apppage = new AppPage();
        loginpage = new LoginPage();
        searchpage = new SearchPage();
    });

    it('should display Login screen when navigated to the site', () => {
        apppage.navigateToSite();
        expect(loginpage.getLoginFormText()).toEqual('Login');
        expect(loginpage.loginFormPresent()).toBeTruthy();
        expect(loginpage.navmenuLoginOptionPresent()).toBeTruthy();
    });

    it('should Login and navigate to search page', () => {
        expect(loginpage.getLoginFormText()).toEqual('Login');
        loginpage.actionLoginAndSeeHomePage();
        apppage.navigateToSearchPage();
        expect(searchpage.getSearchForTicketText()).toEqual('Søg efter tickets');
    });

    it('should see and validate search options', () => {
        expect(searchpage.searchOptionsDisplayed()).toBeTruthy();
    });

    it('should search for tickets assigned to `admin`', () => {
        expect(searchpage.searchForTicketIsPresent()).toBeTruthy();
    });

    it('should logoff', () => {
        expect(apppage.logout()).toBeTruthy();
        expect(loginpage.getLoginFormText()).toEqual('Login');
    });
});
