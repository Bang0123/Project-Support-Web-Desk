import { AppPage } from '../app/app.po';
import { LoginPage } from '../login/login.po';
import { SingleTicketPage } from './singleticket.po';
import { TicketsPage } from '../tickets/tickets.po';

describe('Support Web Desk singleticket view test', () => {
    let apppage: AppPage;
    let loginpage: LoginPage;
    let singlepage: SingleTicketPage;
    let ticketspage: TicketsPage;

    beforeEach(() => {
        apppage = new AppPage();
        loginpage = new LoginPage();
        singlepage = new SingleTicketPage();
        ticketspage = new TicketsPage();
    });

    it('should display Login screen when navigated to the site', () => {
        apppage.navigateToSite();
        expect(loginpage.getLoginFormText()).toEqual('Login');
        expect(loginpage.loginFormPresent()).toBeTruthy();
        expect(loginpage.navmenuLoginOptionPresent()).toBeTruthy();
    });

    it('should Login and navigate to ticket and not see one', () => {
        expect(loginpage.getLoginFormText()).toEqual('Login');
        loginpage.actionLoginAndSeeHomePage();
        apppage.navigateToSingleTicketsPage();
        expect(apppage.getPageH1()).toEqual('Ticket');
        expect(singlepage.getNoTicketH1Present()).toBeTruthy();
    });

    it('should navigate to tickets and see h1', () => {
        apppage.navigateToAllTicketsPage();
        expect(apppage.getPageH1()).toEqual('Se Alle Tickets');
    });

    it('should see tickets in All tickets datatable', () => {
        expect(apppage.getTicketDataTableRowsPresent()).toBeTruthy();
    });

    it('should click `Se Ticket` on first ticket present in datatable', () => {
        ticketspage.clickToSeeTicketInRow();
        expect(singlepage.getDisplayTicketDivPresent()).toBeTruthy();
    });

    it('should see whole ticket', () => {
        expect(singlepage.getTicketSubjectPresent()).toBeTruthy();
        expect(singlepage.getTicketBodyPresent()).toBeTruthy();
        expect(singlepage.getTicketMessagesPresent()).toBeTruthy();
        expect(singlepage.getTicketAnswerFormPresent()).toBeTruthy();
    });

    it('should render snackbar popup on status change', () => {
        singlepage.testChangeStatus();
        expect(apppage.getSnackBarText()).toContain('Status Changed');
    });

    it('should render snackbar popup on priority change', () => {
        singlepage.testChangePriority();
        expect(apppage.getSnackBarText()).toContain('Priority Changed');
    });

    it('Should send intern note and see it afterwards', () => {
        expect(singlepage.testAnswerFlowIntern()).toBeTruthy();
    });

    it('Should send extern message and see it afterwards', () => {
        expect(singlepage.testAnswerFlowExtern()).toBeTruthy();
    });

    it('should logoff', () => {
        expect(apppage.logout()).toBeTruthy();
        expect(loginpage.getLoginFormText()).toEqual('Login');
    });
});
