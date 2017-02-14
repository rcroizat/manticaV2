import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
/*
  Generated class for the ResultPtzPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'result-ptz',
  templateUrl: 'result-ptz.html'
})
export class ResultPtzPage {

	bien:string;
	dure_tot_remb:number;
	montant_differe:number;
	coutMax:number;
	premiere:number;
	seconde:number;
	dure_du_differe:number;


  constructor(public params: NavParams) {
     this.bien = params.get('bien');
     this.dure_tot_remb = this.formatMillier(params.get('dure_tot_remb'));
     this.montant_differe = this.formatMillier(params.get('montant_differe'));
     this.coutMax = this.formatMillier(params.get('coutMax'));
     this.premiere = this.formatMillier(params.get('premiere'));
     this.seconde = this.formatMillier(params.get('seconde'));
     this.dure_du_differe = this.formatMillier(params.get('dure_du_differe'));
  }

  
	formatMillier( nombre){
	nombre = Math.round(nombre);
	nombre += '';
	  let sep = ' ';
	  let reg = /(\d+)(\d{3})/;
	  while( reg.test( nombre)) {
	    nombre = nombre.replace( reg, '$1' +sep +'$2');
	  }
	  return nombre;
	}

}
