import { Component } from '@angular/core';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import { AuthService } from '../../services/auth.service.js';
import { MarcadorPPoT } from '../../clases/marcadorPPoT.js';

declare var require: any;

@Component({
  selector: 'app-ppo-tcomponent',
  templateUrl: './ppot-component.component.html',
  styleUrls: ['./ppot-component.component.css']
})
export class PPoTComponent {

  piedra = require('../../../assets/images/piedra1.jpg');
  papel = require('../../../assets/images/papel1.jpg');
  tijera = require('../../../assets/images/tijera1.jpg');
  incognito = require('../../../assets/images/incognito.png');

  timer: any;
  tiempo;
  tiempoFuera;
  eleccionUsuario;
  ganaste: Boolean;
  perdiste: Boolean;
  empate: Boolean;
  yaJugado: Boolean;
  opcionDecidida: number;
  marcador: MarcadorPPoT;

  constructor(public auth: AuthService) {
    M.AutoInit();
    this.decidirOpcion();
    this.marcador = new MarcadorPPoT(this.auth);
    this.setTimer();
  }

  decidirOpcion() {
    this.opcionDecidida = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    if (this.opcionDecidida !== 1 && this.opcionDecidida !== 2 && this.opcionDecidida !== 3) {
        this.opcionDecidida = 2;
      }
  }

  setTimer() {
    this.timer = 3;
    this.tiempo = window.setInterval(() => this.timer > 0 ?  this.timer -= 1 : this.timerEnCero(this.tiempo), 1000);
  }

  timerEnCero(tiempo: any) {
    clearInterval(tiempo);
    this.tiempoFuera = true;
  }

  evaluar(button: any) {
    if (!this.yaJugado) {
      this.yaJugado = true;
      if (this.timer > 0) {
        if (this.opcionDecidida.toString() === button.target.id) {
          this.empate = true;
          clearInterval(this.tiempo);
        }
        if (this.opcionDecidida === 1 && button.target.id === '2') {
          this.ganaste = true;
          clearInterval(this.tiempo);
          this.marcador.sumarPuntos();
          M.toast({html: '+' + 10 + ' puntos', classes: 'green'});
        }
        if (this.opcionDecidida === 2 && button.target.id === '3') {
          this.ganaste = true;
          clearInterval(this.tiempo);
          this.marcador.sumarPuntos();
          M.toast({html: '+' + 10 + ' puntos', classes: 'green'});
        }
        if (this.opcionDecidida === 3 && button.target.id === '1') {
          this.ganaste = true;
          clearInterval(this.tiempo);
          this.marcador.sumarPuntos();
          M.toast({html: '+' + 10 + ' puntos', classes: 'green'});
        }
        if (this.opcionDecidida === 1 && button.target.id === '3') {
          this.perdiste = true;
          clearInterval(this.tiempo);
          this.marcador.restarPuntos();
          M.toast({html: '-' + 10 + ' puntos', classes: 'red'});
        }
        if (this.opcionDecidida === 2 && button.target.id === '1') {
          this.perdiste = true;
          clearInterval(this.tiempo);
          this.marcador.restarPuntos();
          M.toast({html: '-' + 10 + ' puntos', classes: 'red'});
        }
        if (this.opcionDecidida === 3 && button.target.id === '2') {
          this.perdiste = true;
          clearInterval(this.tiempo);
          this.marcador.restarPuntos();
          M.toast({html: '-' + 10 + ' puntos', classes: 'red'});
        }
      }
    }

  }

  reset() {
    this.empate = false;
    this.ganaste = false;
    this.perdiste = false;
    this.tiempoFuera = false;
    this.yaJugado = false;
    this.decidirOpcion();
    this.setTimer();
  }

}
