import { Component, SimpleChanges, OnChanges, Input } from '@angular/core';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.css']
})
export class PuntajesComponent implements OnChanges{
  tablero: any;
  @Input() detector: any;
  @Input() score: any;

  constructor(public auth: AuthService) {
    document.addEventListener('DOMContentLoaded', function() {
     M.AutoInit();
    });
    this.tablero = {
      anagrama: '0',
      ppot: '0',
      adivina: '0',
      calculo: '0',
      memotest: '0'
    };


  }

  ngOnChanges(changes: SimpleChanges) {
    this.auth.getPuntajes().subscribe(response => {
      if (this.auth.isLogged()) {
      this.tablero = response.body
      }
    });
  }
}
