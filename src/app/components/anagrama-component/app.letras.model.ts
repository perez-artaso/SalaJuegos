declare var require: any;

export class Letras {

  public letras: Object = {
   a : {letra: 'a', valor: require('../../../assets/images/a.png')},
   b : {letra: 'b', valor: require('../../../assets/images/b.png')},
   c : {letra: 'c', valor: require('../../../assets/images/c.png')},
   d : {letra: 'd', valor: require('../../../assets/images/d.png')},
   e : {letra: 'e', valor: require('../../../assets/images/e.png')},
   f : {letra: 'f', valor: require('../../../assets/images/f.png')},
   g : {letra: 'g', valor: require('../../../assets/images/g.png')},
   h : {letra: 'h', valor: require('../../../assets/images/h.png')},
   i : {letra: 'i', valor: require('../../../assets/images/i.png')},
   j : {letra: 'j', valor: require('../../../assets/images/j.png')},
   k : {letra: 'k', valor: require('../../../assets/images/k.png')},
   l : {letra: 'l', valor: require('../../../assets/images/l.png')},
   m : {letra: 'm', valor: require('../../../assets/images/m.png')},
   n : {letra: 'n', valor: require('../../../assets/images/n.png')},
   ñ : {letra: 'ñ', valor: require('../../../assets/images/ñ.png')},
   o : {letra: 'o', valor: require('../../../assets/images/o.png')},
   p : {letra: 'p', valor: require('../../../assets/images/p.png')},
   q : {letra: 'q', valor: require('../../../assets/images/q.png')},
   r : {letra: 'r', valor: require('../../../assets/images/r.png')},
   s : {letra: 's', valor: require('../../../assets/images/s.png')},
   t : {letra: 't', valor: require('../../../assets/images/t.png')},
   u : {letra: 'u', valor: require('../../../assets/images/u.png')},
   v : {letra: 'v', valor: require('../../../assets/images/v.png')},
   w : {letra: 'w', valor: require('../../../assets/images/w.png')},
   x : {letra: 'x', valor: require('../../../assets/images/x.png')},
   y : {letra: 'y', valor: require('../../../assets/images/y.png')},
   z : {letra: 'z', valor: require('../../../assets/images/z.png')},
   á : {letra: 'á', valor: require('../../../assets/images/á.png')},
   é : {letra: 'é', valor: require('../../../assets/images/é.png')},
   í : {letra: 'í', valor: require('../../../assets/images/í.png')},
   ó : {letra: 'ó', valor: require('../../../assets/images/ó.png')},
   ú : {letra: 'ú', valor: require('../../../assets/images/ú.png')},
  };


  public getLetra(letraEntrante: String): String {

    for (const key in this.letras) {
      if (this.letras[key].letra === letraEntrante) {
        return this.letras[key].valor.toString();
      }
    }
  }

}
