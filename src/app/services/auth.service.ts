import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http/';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper: JwtHelperService;
  usr: string;
  token: string;
  senalMarcadores: Boolean;

  constructor(public http: HttpClient) {
    this.helper = new JwtHelperService();
    this.senalMarcadores = true;
  }

 senal() {
   return !this.senalMarcadores;
 }

  registrarse(usr: string, pass: string) {
    this.http.post(
      'http://localhost/sjserver/registro',
    {'usr': usr, 'pass': pass},
    {observe: 'response'}).subscribe(
      response => {
        if (response.body.status === 200) {
          alert('¡Usuario Registrado Con Éxito!');
        } else {
          alert('Nombre De Usuario No Disponible');
        }
      }
    );
  }

  login(usr: string, pass: string) {
    this.http.post(
      'http://localhost/sjserver/login',
      {'usr': usr, 'pass': pass},
      {observe: 'response',
       responseType: 'text'})
    .subscribe(function(response) {
      if (response.body.startsWith('0')) {
        alert('¡Contraseña Incorrecta!');
      } else if (response.body.startsWith('-1')) {
        alert('¡Usuario Inexistente!');
      } else {
        localStorage.setItem('sj_token', response.body);
        alert('¡Bienvenido!');
      }
    });

    this.usr = this.getUsrName();
    this.getPuntajes();
    return false;
  }

  getPuntajes() {
    if (this.isLogged()) {
      return this.http.post('http://localhost/sjserver/consultarPuntajes', {
        'usr': this.helper.decodeToken(localStorage.getItem('sj_token')).usr},
         {observe: 'response'});
    } else {
      return new Observable();
    }
  }



  enviarPuntaje(codigoJuego: number, puntaje: number) {
    this.senal();
    return this.http.post(
      'http://localhost/sjserver/registroPuntajes',
      {'usr': this.helper.decodeToken(localStorage.getItem('sj_token')).usr,
       'codigoJuego': codigoJuego,
        'puntaje': puntaje},
    );
  }

  isLogged() {
    if (localStorage.getItem('sj_token') !== null) {
      if (!this.helper.isTokenExpired(localStorage.getItem('sj_token'))) {
        return true;
      }
    } else {
        return false;
      }
  }

  getUsrName() {
    if (localStorage.getItem('sj_token') !== null) {
      const payload = this.helper.decodeToken(localStorage.getItem('sj_token'));
      return payload.usr;
    } else {
      return 'anónimo';
    }
  }

  logout() {
    localStorage.removeItem('sj_token');
  }
}
