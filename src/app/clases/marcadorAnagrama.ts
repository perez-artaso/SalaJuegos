import { MarcadorPuntaje } from './marcadorPuntaje';

export class MarcadorAnagrama extends MarcadorPuntaje {

  calcularPuntaje(tiempo: number) {
    super.enviarPuntaje(0, tiempo * 10);
  }

}
