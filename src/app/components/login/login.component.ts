import { Component} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as M from '../../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public auth: AuthService) {
    document.addEventListener('DOMContentLoaded', function() {
      M.AutoInit();
     });
  }

  login(usr: string, pass: string) {
    this.auth.login(usr, pass);
    return false;
  }

}
