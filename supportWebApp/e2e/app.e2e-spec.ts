import { AppPage } from './app.po';

describe('support-web-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Login screen when navigated to the site', () => {
    page.navigateToSite();
    expect(page.getLoginFormText()).toEqual('Login');
    expect(page.loginFormPresent()).toBeTruthy();
    expect(page.navmenuLoginOptionPresent()).toBeTruthy();
  });

  it('should Login and see startside', () => {
    expect(page.getLoginFormText()).toEqual('Login');
    page.actionLoginAndSeeHomePage();
    expect(page.getHomePageh1Text()).toEqual('Startside');
  });

  it('should see greeting me `Admin`', () => {
    expect(page.getGreetingText()).toEqual('Velkommen Admin');
  });

  it('should see new tickets', () => {
    expect(page.getNewTicketsTextPresent()).toBeTruthy();
    expect(page.getNewTicketsNumberPresent()).toBeTruthy();
  });

  it('should see my tickets', () => {
    expect(page.getAssignedTicketsTextPresent()).toBeTruthy();
    expect(page.getAssignedTicketsNumberPresent()).toBeTruthy();
  });

  it('should see my tickets in datatable', () => {
    expect(page.getTicketDataTableRowsPresent()).toBeTruthy();
  });

  it('should navigate to ticket site and not see a ticket', () => {
    page.navigateToSingleTicketsPage();
    expect(page.getPageH1()).toEqual('Ticket');
    expect(page.getNoTicketH1Present()).toBeTruthy();
  });

  it('should navigate to tickets and see h1', () => {
    page.navigateToAllTicketsPage();
    expect(page.getPageH1()).toEqual('Se Alle Tickets');
  });

  it('should see open tickets', () => {
    expect(page.getOpenTicketsTextPresent()).toBeTruthy();
    expect(page.getOpenTicketsNumberPresent()).toBeTruthy();
  });

  it('should see critical tickets', () => {
    expect(page.getCriticalTicketsTextPresent()).toBeTruthy();
    expect(page.getCriticalTicketsNumberPresent()).toBeTruthy();
  });

  it('should see tickets in All tickets datatable', () => {
    expect(page.getTicketDataTableRowsPresent()).toBeTruthy();
  });

  it('should change filter of tickets and back', () => {
    expect(page.testFiltering()).toBeTruthy();
  });

  it('should click `Se Ticket` on first ticket present in datatable', () => {
    page.clickToSeeTicketInRow();
    expect(page.getDisplayTicketDivPresent()).toBeTruthy();
  });

  it('should see whole ticket', () => {
    expect(page.getTicketSubjectPresent()).toBeTruthy();
    expect(page.getTicketBodyPresent()).toBeTruthy();
    expect(page.getTicketMessagesPresent()).toBeTruthy();
    expect(page.getTicketAnswerFormPresent()).toBeTruthy();
  });

  it('Should send intern note and see it afterwards', () => {
    expect(page.testAnswerFlowIntern()).toBeTruthy();
  });

  it('Should send extern message and see it afterwards', () => {
    expect(page.testAnswerFlowExtern()).toBeTruthy();
  });

  it('should navigate to search page and validate search options', () => {
    page.navigateToSearchPage();
    expect(page.searchOptionsDisplayed()).toBeTruthy();
    expect(page.getSearchForTicketText()).toEqual('Søg efter tickets');
  });

  it('should search for tickets assigned to `admin`', () => {
    expect(page.searchForTicketIsPresent()).toBeTruthy();
  });
});
