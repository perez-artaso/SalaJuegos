declare const require: any;

export class Numeros {
  numero: Object = {
    1 : {numero: '1', valor: require('../../../assets/images/1.gif')},
    2 : {numero: '2', valor: require('../../../assets/images/2.gif')},
    3 : {numero: '3', valor: require('../../../assets/images/3.gif')},
    4 : {numero: '4', valor: require('../../../assets/images/4.gif')},
    5 : {numero: '5', valor: require('../../../assets/images/5.gif')},
    6 : {numero: '6', valor: require('../../../assets/images/6.gif')},
    7 : {numero: '7', valor: require('../../../assets/images/7.gif')},
    8 : {numero: '8', valor: require('../../../assets/images/8.gif')},
    9 : {numero: '9', valor: require('../../../assets/images/9.gif')},
    0 : {numero: '0', valor: require('../../../assets/images/0.gif')}
  };

  operador: Object = {
    '+' : {op : '+', valor: require('../../../assets/images/+.png')},
    '-' : {op : '-', valor: require('../../../assets/images/-.png')},
    '/' : {op : '/', valor: require('../../../assets/images/dividido.png')},
    '*' : {op : '*', valor: require('../../../assets/images/por.png')}
  };

  getNumero(numero: number): any {
    for (const clave in this.numero) {
      if (this.numero[clave].numero === numero.toString()) {
        return this.numero[clave].valor;
      }
    }
  }

  getOperador(operador: String) {
    for (const clave in this.operador) {
      if (this.operador[clave].op === operador) {
        return this.operador[clave].valor;
      }
    }
  }
}
