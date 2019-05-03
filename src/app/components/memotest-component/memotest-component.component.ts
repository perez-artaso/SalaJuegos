import { Component } from '@angular/core';
import {Tarjetero} from './app.model.tarjetas';
import { ITarjeta } from './app.ITarjeta';
import { AuthService } from '../../services/auth.service';
import { MarcadorAnagrama } from '../../clases/marcadorAnagrama';
import { MarcadorMemotest } from '../../clases/marcadorMemotest';
import * as M from '../../../assets/materialize/js/materialize.min.js';
declare var require: any;

@Component({
  selector: 'app-memotest-component',
  templateUrl: './memotest-component.component.html',
  styleUrls: ['./memotest-component.component.css']
})
export class MemotestComponent {

  tarjetas: Tarjetero;
  incognito: string;
  semaforoTarjetas: Array<Object>;
  contadorTarjetasMostradas: number;
  tablero: Array<ITarjeta>;
  tableroIncognito: Array<ITarjeta>;
  ganar: Boolean;
  timer: number;
  tiempo;
  marcador: MarcadorAnagrama;


  constructor(public auth: AuthService) {
    this.incognito = require('../../../assets/images/incognito.png');
    this.ganar = false;
    this.timer = 0;
    this.tarjetas = new Tarjetero();
    this.inicializarTablero();
    this.disponerTablero();
    this.inicializarTableroIncognito();
    this.disponerTableroIncognito();
    this.contadorTarjetasMostradas = 0;
    this.marcador = new MarcadorMemotest(this.auth);
    this.setTimer();
  }

  setTimer() {
    this.tiempo = setInterval(() => this.timer++, 1000);
  }

  darVuelta(indice: number, img: HTMLImageElement) {
    this.contadorTarjetasMostradas++;
    if (this.contadorTarjetasMostradas === 1) {
      this.tableroIncognito[indice].url = this.tablero[indice].url;
      this.tableroIncognito[indice].mostrar = true;
      this.tablero[indice].mostrar = true;
    } else if (this.contadorTarjetasMostradas === 2) {
      let indiceCoincidente: any;
      const urlBuscada = this.tablero[indice].url;
      this.tableroIncognito[indice].url = this.tablero[indice].url;
      this.tablero[indice].mostrar = true;
      this.tableroIncognito[indice].mostrar = true;
      this.tablero.forEach(function(tarjeta, index) {
        if (tarjeta.posicion !== indice && tarjeta.url === urlBuscada) {
          indiceCoincidente = index;
        }
      });
      if (indiceCoincidente !== undefined) {
        if (this.tableroIncognito[indiceCoincidente].mostrar === true) {
          setTimeout(() => this.tableroIncognito.forEach(function(tarjeta) {
            if (tarjeta.posicion === indiceCoincidente || tarjeta.posicion === indice) {
              tarjeta.url = require('../../../assets/images/correcto.png');
              tarjeta.correcto = true;
            }
          }), 1000);
          setTimeout(() => this.ganar = this.evaluarFin(), 1000);
        } else {
          setTimeout(() => this.tableroIncognito.forEach(function(tarjeta) {
            if (tarjeta.url !== require('../../../assets/images/incognito.png') && tarjeta.correcto === false) {
              tarjeta.url = require('../../../assets/images/incognito.png');
              tarjeta.mostrar = false;
            }
          }), 1000);

        }
      }
      this.contadorTarjetasMostradas = 0;
    }
  }

  inicializarTableroIncognito() {
    this.tableroIncognito = [];
    for (let i = 0; i < 12 ; i++) {
      const tarjeta: ITarjeta = {posicion: -1, url: this.incognito, mostrar: false, correcto: false};
      this.tableroIncognito.push(tarjeta);
    }
  }

  disponerTableroIncognito() {
    this.desordenarArray(this.tableroIncognito);
    for (let i = 0 ; i < this.tableroIncognito.length ; i++) {
      this.tableroIncognito[i].posicion = i;
    }
  }

  inicializarTablero() {
    this.tablero = [];
    for (let i = 0; i < 6 ; i++) {
      const tarjeta1: ITarjeta = {posicion: -1, url: this.tarjetas.getTarjeta(i + 1), mostrar: false, correcto: false};
      const tarjeta2: ITarjeta = {posicion: -1, url: this.tarjetas.getTarjeta(i + 1), mostrar: false, correcto: false};
      this.tablero.push(tarjeta1);
      this.tablero.push(tarjeta2);
    }
  }

  disponerTablero() {
    this.desordenarArray(this.tablero);
    for (let i = 0 ; i < this.tablero.length ; i++) {
      this.tablero[i].posicion = i;
    }
  }

  desordenarArray(array: Array<any>) {
    array.sort((a, b) => 0.5 - Math.random());
  }

  evaluarFin(): Boolean {
    let retValue = true;
    this.tableroIncognito.forEach((tarjeta) => tarjeta.correcto === false ? retValue = false : true);
    if (retValue) {
      clearInterval(this.tiempo);
      this.marcador.calcularPuntaje(this.timer);
      M.toast({html: '+' + 1000 / this.tiempo + ' puntos', classes: 'green'});
    }
    return retValue;
  }

  reset() {
    this.ganar = false;
    this.inicializarTablero();
    this.disponerTablero();
    this.inicializarTableroIncognito();
    this.disponerTableroIncognito();
    this.contadorTarjetasMostradas = 0;
    this.timer = 0;
    this.setTimer();
  }
}
