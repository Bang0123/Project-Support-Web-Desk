import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { TicketViewComponent } from './components/ticket-view/ticket-view.component';
import { SingleTicketViewComponent } from './components/single-ticket-view/single-ticket-view.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { TestModuleModule } from './modules/test-module/test-module.module';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavmenuComponent,
        HomeComponent,
        TicketViewComponent,
        SingleTicketViewComponent,
        LoginPageComponent,
        SearchViewComponent
      ],
      imports: [
        TestModuleModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach((() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'Support Web Desk'`, async(() => {
    expect(component.title.getTitle()).toBe('Support Web Desk');
  }));

  it('main div should have container-fluid class', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').className).toBe('container-fluid');
  }));

  it('should render app-navmenu', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navmenu')).toBeTruthy();
  }));

  it('should render router-outlet', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));
});
