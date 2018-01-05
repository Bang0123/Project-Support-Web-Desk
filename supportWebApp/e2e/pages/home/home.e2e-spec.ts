import { AppPage } from '../app/app.po';
import { LoginPage } from '../login/login.po';
import { HomePage } from './home.po';

describe('Support Web Desk Homepage test', () => {
    let apppage: AppPage;
    let loginpage: LoginPage;
    let homepage: HomePage;

    beforeEach(() => {
        apppage = new AppPage();
        loginpage = new LoginPage();
        homepage = new HomePage();
    });

    it('should display Login screen when navigated to the site', () => {
        apppage.navigateToSite();
        expect(loginpage.getLoginFormText()).toEqual('Login');
        expect(loginpage.loginFormPresent()).toBeTruthy();
        expect(loginpage.navmenuLoginOptionPresent()).toBeTruthy();
    });

    it('should Login and see h1 startside', () => {
        expect(loginpage.getLoginFormText()).toEqual('Login');
        loginpage.actionLoginAndSeeHomePage();
        expect(homepage.getHomePageh1Text()).toEqual('Startside');
    });

    it('should see greeting me `Admin`', () => {
        expect(homepage.getGreetingText()).toEqual('Velkommen Admin');
    });

    it('should see new tickets', () => {
        expect(homepage.getNewTicketsTextPresent()).toBeTruthy();
        expect(homepage.getNewTicketsNumberPresent()).toBeTruthy();
    });

    it('should see my tickets', () => {
        expect(homepage.getAssignedTicketsTextPresent()).toBeTruthy();
        expect(homepage.getAssignedTicketsNumberPresent()).toBeTruthy();
    });

    it('should see my tickets in datatable', () => {
        expect(apppage.getTicketDataTableRowsPresent()).toBeTruthy();
    });

    it('should logoff', () => {
        expect(apppage.logout()).toBeTruthy();
        expect(loginpage.getLoginFormText()).toEqual('Login');
    });
});
