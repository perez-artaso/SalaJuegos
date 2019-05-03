import { Component } from '@angular/core';
import { Numeros } from './app.model.numeros';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import { MarcadorCalculo } from '../../clases/marcadorCalculo';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-calculo-component',
  templateUrl: './calculo-component.component.html',
  styleUrls: ['./calculo-component.component.css']
})
export class CalculoComponent {

  operandoUno: number;
  operandoDos: number;
  operador: String;
  resultado: number;
  imgNumeros: Numeros;
  arrayImgNumeros: String[];
  tiempoFuera: Boolean;
  correcto: Boolean;
  incorrecto: Boolean;
  unidad: number;
  decena: number;
  timer: any;
  tiempo;
  marcador: MarcadorCalculo;

  constructor(public auth: AuthService) {
    this.arrayImgNumeros = [];
    this.marcador = new MarcadorCalculo(this.auth);
    this.imgNumeros = new Numeros();
    M.AutoInit();
    this.iniciarDesafio();
  }

  iniciarDesafio() {
    this.operandoUno = Math.floor(Math.random() * 100) + 1;
    this.operandoDos = Math.floor(Math.random() * 100) + 1;

    switch (Math.floor(Math.random() * (5 - 1) + 1)) {
      case 1:
        this.operador = '+';

        this.resultado = this.operandoUno + this.operandoDos;

        break;

      case 2:
        this.operador = '-';

        this.resultado = this.operandoUno - this.operandoDos;

        break;

      case 3:
        this.operador = '*';

        this.operandoDos = Math.floor(this.operandoDos / 10);

        this.resultado = this.operandoUno * this.operandoDos;

        break;

      case 4:
        this.operador = '/';

        while (this.operandoUno % this.operandoDos !== 0 || this.operandoUno === this.operandoDos) {
          this.operandoDos = Math.floor(Math.random() * (100 - 5)) + 5;
        }

        this.resultado = this.operandoUno / this.operandoDos;

        break;

      default:

        this.operador = '+';
        this.resultado = this.operandoUno + this.operandoDos;

        break;
    }

    this.cargarArrayImgNumeros(this.operandoUno);
    this.cargarImgOperador();
    this.cargarArrayImgNumeros(this.operandoDos);

    this.setTimer();
  }

  evaluar(respuesta: HTMLInputElement) {
    clearInterval(this.tiempo);
    if (this.resultado.toString() === respuesta.value) {
      this.correcto = true;
      this.incorrecto = false;
      this.marcador.calcularPuntaje(this.tiempo);
      M.toast({html: '+' + this.tiempo * 2 + ' puntos', classes: 'green'});
    } else {
      this.incorrecto = true;
      this.correcto = false;
    }

    respuesta.value = '';
  }

  nuevoDesafio() {
    clearInterval(this.tiempo);
    this.correcto = false;
    this.incorrecto = false;
    this.tiempoFuera = false;
    let respuesta = <HTMLInputElement>document.getElementById('respuesta');
    respuesta.readOnly = false;
    respuesta.value = '';
    this.arrayImgNumeros = [];
    this.iniciarDesafio();
  }

  setTimer() {
    this.timer = 12;
    this.tiempo = window.setInterval(() => this.timer > 0 ?  this.timer -= 1 : this.timerEnCero(this.tiempo), 1000);
  }

  timerEnCero(tiempo: any) {
    clearInterval(tiempo);
    let respuesta = <HTMLInputElement>document.getElementById('respuesta');
    respuesta.readOnly = true;
    respuesta.value = '';
    this.tiempoFuera = true;
  }

  cargarArrayImgNumeros(numero: number) {
    let decena;
    let unidad;

    if (numero > 9) {
    this.decena = decena = Math.floor(numero / 10);
    this.unidad = unidad = Math.round(((((numero / 10) - (decena - 1))) - 1) * 10);
    } else {
      this.decena = decena = 0;
      this.unidad = unidad = numero;
    }

    this.arrayImgNumeros.push(this.imgNumeros.getNumero(decena));
    this.arrayImgNumeros.push(this.imgNumeros.getNumero(unidad));
  }

  cargarImgOperador() {
    this.arrayImgNumeros.push(this.imgNumeros.getOperador(this.operador));
  }

}
