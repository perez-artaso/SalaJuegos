import { Component } from '@angular/core';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import { MarcadorAdivina } from '../../clases/marcadorAdivina.js';
import { AuthService } from '../../services/auth.service.js';

declare var require: any;

@Component({
  selector: 'app-adivina-component',
  templateUrl: './adivina-component.component.html',
  styleUrls: ['./adivina-component.component.css']
})
export class AdivinaComponent {

  numeroAdivinar: number;
  correcto: Boolean;
  intentos: number;
  marcador: MarcadorAdivina;
  incognito = require('../../../assets/images/incognito.png');

  constructor(public auth: AuthService) {
    this.asignarNumero();
    this.marcador = new MarcadorAdivina(this.auth);
  }

  asignarNumero() {
    this.correcto = false;
    this.numeroAdivinar = Math.floor(Math.random() * (100 - 1) - 1);
    this.intentos = 0;
  }

  evaluar(respuesta: HTMLInputElement) {
    this.intentos++;
    if (respuesta.value === this.numeroAdivinar.toString()) {
      this.correcto = true;
      this.marcador.calcularPuntaje(this.intentos);
      M.toast({html: '¡Correcto!',
              classes: 'light-green darken-3'});
    M.toast({html: '+' + 1000 / this.intentos  + ' puntos', classes: 'green'});
    } else if(this.numeroAdivinar -  respuesta.value < -3 && this.numeroAdivinar -  respuesta.value > -10 || this.numeroAdivinar -  respuesta.value < 10 && this.numeroAdivinar -  respuesta.value > 3 ){
      M.toast({html : '¡TIBIO!', classes : 'deep-orange accent-3'});
    }else if(this.numeroAdivinar -  respuesta.value < -9 && this.numeroAdivinar -  respuesta.value > -20 || this.numeroAdivinar -  respuesta.value > 9 && this.numeroAdivinar -  respuesta.value < 20 ){
      M.toast({html : '¡FRIO!', classes : 'cyan accent-2'});
    }else if(this.numeroAdivinar -  respuesta.value < 50 && this.numeroAdivinar -  respuesta.value > 19 || this.numeroAdivinar -  respuesta.value > -50 && this.numeroAdivinar -  respuesta.value < -19 ){
      M.toast({html : '¡HELADO!', classes : 'cyan lighten-2'});
    }else if(this.numeroAdivinar -  respuesta.value < 0 && this.numeroAdivinar -  respuesta.value > -4 || this.numeroAdivinar -  respuesta.value > 0 && this.numeroAdivinar -  respuesta.value < 4 ){
      M.toast({html : '¡CALIENTE!', classes : 'red accent-4'});
    }else{
      M.toast({html : '¡HELADISIMO!', classes : 'light-blue'});
    }
    respuesta.value = '';
  }

}
