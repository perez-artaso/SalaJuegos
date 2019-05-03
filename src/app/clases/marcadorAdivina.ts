import { MarcadorPuntaje } from './marcadorPuntaje';

export class MarcadorAdivina extends MarcadorPuntaje {

  calcularPuntaje(intentos: number) {
    super.enviarPuntaje(2, 1000 / intentos);
  }

}
