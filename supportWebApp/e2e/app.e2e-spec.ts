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
    expect(page.getNewTicketsNumberPresent()).toBeTruthy();
    expect(page.getNewTicketsTextPresent()).toBeTruthy();
  });

  it('should see my tickets', () => {
    expect(page.getAssignedTicketsTextPresent()).toBeTruthy();
    expect(page.getAssignedTicketsNumberPresent()).toBeTruthy();
  });

  it('should see my tickets in datatable', () => {
    expect(page.getAssignedTicketDataTable()).toBeTruthy();
  });

  it('should navigate to tickets and see h1', () => {
    expect(page.getAllTicketsH1()).toEqual('Se Alle Tickets');
  });
});
