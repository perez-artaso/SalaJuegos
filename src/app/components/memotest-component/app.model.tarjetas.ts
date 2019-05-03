declare var require: any;

export class Tarjetero {
  tarjetas: Object = {
    '1' : {clave: 1, valor: require('../../../assets/images/escorpion.jpg')},
    '2' : {clave: 2, valor: require('../../../assets/images/pajaro.jpg')},
    '3' : {clave: 3, valor: require('../../../assets/images/rana.jpg')},
    '4' : {clave: 4, valor: require('../../../assets/images/rata.jpg')},
    '5' : {clave: 5, valor: require('../../../assets/images/vari.jpg')},
    '6' : {clave: 6, valor: require('../../../assets/images/zorro.jpg')}
  };

  getTarjeta(numero: number) {
    for (const key in this.tarjetas) {
      if (this.tarjetas[key].clave === numero) {
        return this.tarjetas[key].valor;
      }
    }
  }
}
