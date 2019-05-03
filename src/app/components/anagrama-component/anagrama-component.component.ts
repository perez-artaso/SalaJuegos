import { Component, OnInit } from '@angular/core';
import { Letras } from './app.letras.model';
import { MarcadorAnagrama } from '../../clases/marcadorAnagrama';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './anagrama-component.component.html',
  styleUrls: ['./anagrama-component.component.css']
})
export class AnagramaComponent implements OnInit {


  letras: Letras = new Letras();
  arrayRutasImg: Array<String>;
  texto: String;
  palabras: String[];
  palabraOrdenada: String;
  palabraSaliente: String = '';
  correcto: boolean;
  incorrecto: boolean;
  emerger: Boolean = false;
  timer: any;
  tiempo;
  tiempoFuera;
  marcador: MarcadorAnagrama;

  constructor(public auth: AuthService) {
    this.texto = `El autor salvadoreño visitó nuestro país en el marco del Filba Internacional,
    donde participó de distintas actividades. Además de contar con letios reconocimientos literarios
    a su labor, es candidato al prestigioso Premio Médicis de Francia por su libro La salvaje
    inocencia o la inocente pornógrafa, Castellanos acaba de ser editado en nuestro país con la
    primera, La diáspora de sus doce novelas, además de cuentos,
    ensayos y antologías.`;
    M.AutoInit();
    this.marcador = new MarcadorAnagrama(this.auth);
    this.palabras = this.trimeadorDePalabras(this.spliteador(this.texto));
    this.palabras = this.removedorDeComas(this.palabras);
    this.palabras = this.palabras.filter(this.filtroDeEspaciosEnBlanco).filter(this.filtroDeCantidadLetras);
    this.palabraOrdenada = this.selectorDePalabra();
    this.desordenarPalabra();
    this.arrayRutasImg = new Array<String>();
    this.getArrayRutasImg(this.palabraSaliente);
    setTimeout(() => this.emerger = true, 400);
    this.setTimer();
  }

  ngOnInit() {

  }

  trimeadorDePalabras = (array: String[]) => array.map(miPalabra => miPalabra.trim());

  spliteador = (texto: String): String[] => texto.split(' ');

  removedorDeComas(array: String[]): String[] {
    const nuevoArray: String[] = new Array<String>();
    array.forEach(function(palabra) {
      nuevoArray.push(palabra.split(',')[0].split('.')[0].toLocaleLowerCase());
    });

    return nuevoArray;
  }

  filtroDeEspaciosEnBlanco(palabra: String) {
    return palabra !== ' ';
  }

  filtroDeCantidadLetras(palabra: String){
    return palabra.length > 2;
  }

  selectorDePalabra(){
    return this.palabras[Math.floor(Math.random() * this.palabras.length)];
  }

  desordenarPalabra(){
    do {
      this.palabraSaliente = this.palabraOrdenada.split('').sort(function() {return 0.5 - Math.random(); }).join('');
    }while (this.palabraSaliente === this.palabraOrdenada);
  }

  getArrayRutasImg(palabra: String){

    for(let i = 0; i < palabra.length; i++) {
      this.arrayRutasImg.push(this.traerRutaLetra(palabra.charAt(i)));
    }

  }

  traerRutaLetra(letraBuscada: String) {
    return this.letras.getLetra(letraBuscada);
  }

  evaluar(respuesta: HTMLInputElement): any {
    respuesta.value === this.palabraOrdenada ?  this.respuestaCorrecta() : this.respuestaIncorrecta() ;
    this.incorrecto = respuesta.value === this.palabraOrdenada ?  false :  true;
    return false;
  }

  respuestaCorrecta() {
    this.correcto = true;
    clearInterval(this.tiempo);
    this.marcador.calcularPuntaje(this.tiempo);
    M.toast({html: '+' + this.tiempo * 10 + ' puntos', classes: 'green'});
  }

  respuestaIncorrecta() {
    this.correcto = false;
    clearInterval(this.tiempo);
  }

  setTimer() {
    this.timer = 30;
    this.tiempo = window.setInterval(() => this.timer > 0 ?  this.timer -= 1 : this.timerEnCero(this.tiempo), 1000);
  }

  timerEnCero(tiempo: any) {
    clearInterval(tiempo);
    let respuesta = <HTMLInputElement>document.getElementById('respuesta');
    respuesta.readOnly = true;
    this.tiempoFuera = true;
  }

  nuevaPalabra(respuesta: HTMLInputElement)
  {
    this.palabraOrdenada = this.selectorDePalabra();
    this.desordenarPalabra();
    this.correcto = false;
    this.incorrecto = false;
    this.tiempoFuera = false;
    respuesta.value = '';
    let respuestaCasted = <HTMLInputElement>document.getElementById('respuesta');
    respuestaCasted.readOnly = false;
    this.emerger = false;
    this.arrayRutasImg = [];
    this.getArrayRutasImg(this.palabraSaliente);
    clearInterval(this.tiempo);
    this.setTimer();
    setTimeout(() => this.emerger = true, 400);
    return false;
  }


}

