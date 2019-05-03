import { MarcadorPuntaje } from './marcadorPuntaje';

export class MarcadorPPoT extends MarcadorPuntaje {
  sumarPuntos() {
    super.enviarPuntaje(1, 10);
  }

  restarPuntos() {
    super.enviarPuntaje(1, -10);
  }
}
