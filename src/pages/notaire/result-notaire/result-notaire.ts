import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
/*
  Generated class for the ResultPtzPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'result-notaire',
    templateUrl: 'result-notaire.html'
})

export class ResultNotairePage {

	emoluments_notaire:string;
	droit_et_taxes_sum:number;
	emoluments_formalites:number;
	securite_immobilier_fn:number;
	result:number;


  constructor(public params: NavParams) {
     this.emoluments_notaire = params.get('emoluments_notaire');
     this.droit_et_taxes_sum = params.get('droit_et_taxes_sum');
     this.emoluments_formalites = params.get('emoluments_formalites');
     this.securite_immobilier_fn = params.get('securite_immobilier_fn');
     this.result = params.get('result');
  }



}
