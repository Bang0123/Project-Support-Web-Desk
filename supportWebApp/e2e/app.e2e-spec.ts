import { AppPage } from './pages/app.po';
import { LoginPage } from './pages/login.po';
import { HomePage } from './pages/home.po';
import { SingleTicketPage } from './pages/singleticket.po';
import { TicketsPage } from './pages/tickets.po';
import { SearchPage } from './pages/search.po';

describe('Support Web Desk App', () => {
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

  it('should see whole ticket', () => {
    expect(singlepage.getTicketSubjectPresent()).toBeTruthy();
    expect(singlepage.getTicketBodyPresent()).toBeTruthy();
    expect(singlepage.getTicketMessagesPresent()).toBeTruthy();
    expect(singlepage.getTicketAnswerFormPresent()).toBeTruthy();
  });

  it('Should send intern note and see it afterwards', () => {
    expect(singlepage.testAnswerFlowIntern()).toBeTruthy();
  });

  it('Should send extern message and see it afterwards', () => {
    expect(singlepage.testAnswerFlowExtern()).toBeTruthy();
  });

  it('should navigate to search page and validate search options', () => {
    apppage.navigateToSearchPage();
    expect(searchpage.searchOptionsDisplayed()).toBeTruthy();
    expect(searchpage.getSearchForTicketText()).toEqual('Søg efter tickets');
  });

  it('should search for tickets assigned to `admin`', () => {
    expect(searchpage.searchForTicketIsPresent()).toBeTruthy();
  });
});
