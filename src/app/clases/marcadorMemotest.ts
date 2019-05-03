import { MarcadorPuntaje } from './marcadorPuntaje';

export class MarcadorMemotest extends MarcadorPuntaje {

  calcularPuntaje(tiempo: number) {
    super.enviarPuntaje(4, 1000 / tiempo);
  }

}
