import { AppPage } from '../app/app.po';
import { LoginPage } from './login.po';
import { HomePage } from '../home/home.po';

describe('Support Web Desk loginpage test', () => {
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

    it('should Login and see the redirected page', () => {
        expect(loginpage.getLoginFormText()).toEqual('Login');
        loginpage.actionLoginAndSeeHomePage();
        expect(homepage.getHomePageh1Text()).toEqual('Startside');
    });

    it('should logoff', () => {
        expect(apppage.logout()).toBeTruthy();
        expect(loginpage.getLoginFormText()).toEqual('Login');
    });
});
