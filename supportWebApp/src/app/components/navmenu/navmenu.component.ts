import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Authuser } from '../../models/authuser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  signedIn: Observable<boolean>;
  name: string;
  isAdmin: boolean;
  siteTitle: string;
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    title: Title) {
    this.siteTitle = title.getTitle();
  }

  ngOnInit() {
    this.signedIn = this.authenticationService.isSignedIn();

    this.authenticationService.userChanged().subscribe(
      (user: Authuser) => {
        this.name = user.userName;
        this.isAdmin = this.authenticationService.isInRole('administrator');
      });
  }

  signout(): void {
    this.authenticationService.signout();

    this.router.navigate(['/login']);
  }
}
