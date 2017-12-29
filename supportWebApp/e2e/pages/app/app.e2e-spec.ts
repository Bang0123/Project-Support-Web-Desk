import { AppPage } from './app.po';
import { LoginPage } from '../login/login.po';
import { HomePage } from '../home/home.po';
import { SingleTicketPage } from '../singleticket/singleticket.po';
import { TicketsPage } from '../tickets/tickets.po';
import { SearchPage } from '../search/search.po';

describe('Support Web Desk App overview test', () => {
    let apppage: AppPage;
    let loginpage: LoginPage;
    let homepage: HomePage;
    let singlepage: SingleTicketPage;
    let ticketspage: TicketsPage;
    let searchpage: SearchPage;

    beforeEach(() => {
        apppage = new AppPage();
        loginpage = new LoginPage();
        homepage = new HomePage();
        singlepage = new SingleTicketPage();
        ticketspage = new TicketsPage();
        searchpage = new SearchPage();
    });

    it('should display Login screen when navigated to the site', () => {
        apppage.navigateToSite();
        expect(loginpage.getLoginFormText()).toEqual('Login');
        expect(loginpage.loginFormPresent()).toBeTruthy();
        expect(loginpage.navmenuLoginOptionPresent()).toBeTruthy();
    });

    it('should Login and see startside', () => {
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

    it('should navigate to ticket site and not see a ticket', () => {
        apppage.navigateToSingleTicketsPage();
        expect(apppage.getPageH1()).toEqual('Ticket');
        expect(singlepage.getNoTicketH1Present()).toBeTruthy();
    });

    it('should navigate to tickets and see h1', () => {
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

    it('should click `Se Ticket` on first ticket present in datatable', () => {
        ticketspage.clickToSeeTicketInRow();
        expect(singlepage.getDisplayTicketDivPresent()).toBeTruthy();
    });

    it('should navigate to search page and validate search options', () => {
        apppage.navigateToSearchPage();
        expect(searchpage.searchOptionsDisplayed()).toBeTruthy();
        expect(searchpage.getSearchForTicketText()).toEqual('Søg efter tickets');
    });

    it('should logoff', () => {
        expect(apppage.logout()).toBeTruthy();
        expect(loginpage.getLoginFormText()).toEqual('Login');
    });
});
