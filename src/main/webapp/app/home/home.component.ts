import { Component } from '@angular/core';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent {
  constructor(private accountService: AccountService, private loginModalService: LoginModalService) {}

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.loginModalService.open();
  }
}
