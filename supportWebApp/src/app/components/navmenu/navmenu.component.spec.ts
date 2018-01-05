import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { NavmenuComponent } from './navmenu.component';
import { TestModuleModule } from '../../modules/test-module/test-module.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { combineAll } from 'rxjs/operators/combineAll';
class MockAuthService {

}

describe('NavmenuComponent', () => {
  let component: NavmenuComponent;
  let fixture: ComponentFixture<NavmenuComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavmenuComponent],
      imports: [
        TestModuleModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.main-nav div.navbar.navbar-inverse'))
      .toBeTruthy();
  });

  it('should render navbar title', () => {
    const title = 'TitleTest';
    component.siteTitle = title;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.main-nav div.navbar.navbar-inverse div.navbar-header a[name="title"]').innerHTML)
      .toEqual(title);
  });

  it('should render navbar list items', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.main-nav div.navbar-collapse.collapse ul.nav.navbar-nav'))
      .toBeTruthy();
  });

  it('should render navbar startside item', () => {
    const trueverb = new BehaviorSubject<boolean>(true);
    component.signedIn = trueverb;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.main-nav div.navbar-collapse.collapse ul.nav.navbar-nav li a[name="home"]').innerHTML)
      .toContain('Startside');
  });

  it('should render navbar tickets item', () => {
    const trueverb = new BehaviorSubject<boolean>(true);
    component.signedIn = trueverb;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.main-nav div.navbar-collapse.collapse ul.nav.navbar-nav li a[name="tickets"]').innerHTML)
      .toContain('Tickets');
  });

  it('should render navbar single ticket item', () => {
    const trueverb = new BehaviorSubject<boolean>(true);
    component.signedIn = trueverb;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.main-nav div.navbar-collapse.collapse ul.nav.navbar-nav li a[name="ticket"]').innerHTML)
      .toContain('Ticket');
  });

  it('should render navbar search item', () => {
    const trueverb = new BehaviorSubject<boolean>(true);
    component.signedIn = trueverb;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.main-nav div.navbar-collapse.collapse ul.nav.navbar-nav li a[name="search"]').innerHTML)
      .toContain('Søg');
  });

  it('should render navbar login item', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.main-nav div.navbar-collapse.collapse ul.nav.navbar-nav li a[name="login"]').innerHTML)
      .toContain('Login');
  });

  it('should render navbar logout item', () => {
    const trueverb = new BehaviorSubject<boolean>(true);
    component.signedIn = trueverb;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.main-nav div.navbar-collapse.collapse ul.nav.navbar-nav li a[name="logout"]').innerHTML)
      .toContain('Logout');
  });
});
