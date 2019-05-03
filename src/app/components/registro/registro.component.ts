import { Component} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as M from '../../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(public auth: AuthService) {
    document.addEventListener('DOMContentLoaded', function() {
      M.AutoInit();
     });
  }

  registrarse(usr: string, pass: string) {
    this.auth.registrarse(usr, pass);
  }

}
