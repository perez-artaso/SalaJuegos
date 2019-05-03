import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as M from '../assets/materialize/js/materialize.min.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  titulo: string;


  constructor(public auth: AuthService) {
    document.addEventListener('DOMContentLoaded', function() {
      const sideNav = document.querySelectorAll('.sidenav');
      const initSideNav = M.Sidenav.init(sideNav, {});
    });
    this.titulo = '¡Bienvenido!';
  }

  asignarTitulo(juego: HTMLAnchorElement) {
    this.titulo = juego.innerHTML;
  }
}
