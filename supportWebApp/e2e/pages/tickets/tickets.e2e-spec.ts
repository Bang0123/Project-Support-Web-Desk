import { AppPage } from '../app/app.po';
import { LoginPage } from '../login/login.po';
import { TicketsPage } from './tickets.po';

describe('Support Web Desk tickets view test', () => {
    let apppage: AppPage;
    let loginpage: LoginPage;
    let ticketspage: TicketsPage;

    beforeEach(() => {
        apppage = new AppPage();
        loginpage = new LoginPage();
        ticketspage = new TicketsPage();
    });

    it('should display Login screen when navigated to the site', () => {
        apppage.navigateToSite();
        expect(loginpage.getLoginFormText()).toEqual('Login');
        expect(loginpage.loginFormPresent()).toBeTruthy();
        expect(loginpage.navmenuLoginOptionPresent()).toBeTruthy();
    });

    it('should Login and navigate to tickets', () => {
        expect(loginpage.getLoginFormText()).toEqual('Login');
        loginpage.actionLoginAndSeeHomePage();
        apppage.navigateToAllTicketsPage();
        expect(apppage.getPageH1()).toEqual('Se Alle Tickets');
    });

    it('should see open tickets', () => {
        expect(ticketspage.getOpenTicketsTextPresent()).toBeTruthy();
        expect(ticketspage.getOpenTicketsNumberPresent()).toBeTruthy();
    });

    it('should see critical tickets', () => {
        expect(ticketspage.getCriticalTicketsTextPresent()).toBeTruthy();
        expect(ticketspage.getCriticalTicketsNumberPresent()).toBeTruthy();
    });

    it('should see tickets in All tickets datatable', () => {
        expect(apppage.getTicketDataTableRowsPresent()).toBeTruthy();
    });

    it('should change filter of tickets and back', () => {
        expect(ticketspage.testFiltering()).toBeTruthy();
    });

    it('should logoff', () => {
        expect(apppage.logout()).toBeTruthy();
        expect(loginpage.getLoginFormText()).toEqual('Login');
    });
});
