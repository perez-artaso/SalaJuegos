import { MarcadorPuntaje } from './marcadorPuntaje';

export class MarcadorCalculo extends MarcadorPuntaje {

  calcularPuntaje(tiempo: number) {
    super.enviarPuntaje(3, tiempo * 2);
  }

}
