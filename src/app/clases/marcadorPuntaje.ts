import { AuthService } from '../services/auth.service';

export class MarcadorPuntaje {

  puntos: number;

  constructor(public auth: AuthService) {

  }

  enviarPuntaje(codigoJuego: number, puntaje: number) {
    this.auth.enviarPuntaje(codigoJuego, puntaje).subscribe();
  }

}
