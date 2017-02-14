import {Component, OnInit, Input} from '@angular/core';
import {Data} from '../../services/data';
import {DataService} from '../../services/data.service';

import {NavController, Platform} from 'ionic-angular';
import {DevisPage} from '../devis/devis';


@Component({
  selector: 'capacite',
  templateUrl: 'capacite.html'
})
export class CapacitePage implements OnInit {

	@Input() datas: Data;
	montantAssurance: number;
	result: any;
	resultSal: number;
	cout: number;

	taux:any[];
	ios:boolean = false;
	

	constructor(private nav: NavController, private _dataService: DataService, private platform: Platform) {
	 this.platform = platform;

	    if (this.platform.is('ios')) {
	      // This will only print when on iOS
	      this.ios = true;
	    }
	}


	ngOnInit() {
		this.getDatas();

	}

	getDatas() {
		// on recupere le taux sur emantica
		this._dataService.getTaux().subscribe(
                     taux  => this.taux = taux,
                     error => console.log(<any>error));


		this._dataService.getDatas().then((data: Array<any>) => {
			this.datas = {
				montant: data[0] || null,
				mensualites: data[1] || null,
				duree: data[2] || null,
				interets: data[3] || 0.75,
				dossier: data[4] || null,
				assurance: data[5] || null,
				caution: data[6] || null,
				apport: data[7] || null,
				notaire: data[8] || null
			},  rejet => {
				console.log(rejet)
			};
		this.calcul();
		});
	}

	calcul(){

		this.resultSal = 
			 	(
					this.datas.mensualites *
						(1- Math.pow((1+((this.datas.interets/100)/12)),-this.datas.duree*12))/
						((this.datas.interets/100)/12)
				);
		this.montantAssurance = (this.datas.assurance * this.datas.duree * (this.resultSal/100));

		let coutSal =  (+this.datas.dossier) + (+this.datas.caution) + (+this.montantAssurance);

		if((this.resultSal - coutSal) > 0){
			this.result = this.formatMillier(Math.round(this.resultSal- coutSal));
		}else{
			this.result = null;
		}
		if(coutSal > 0){
			this.cout = this.formatMillier(Math.round(coutSal));
		}else{
			this.cout = null;
		}
		this.cout = this.formatMillier(Math.round(coutSal));

		if(Math.round(this.resultSal) > 0){ // sauvegarde de la capacite d'emprunt qui est égal au budget du client
			this._dataService.save('capacite', Math.round(this.resultSal));

		}
	}



	formatMillier( nombre ){
		nombre += '';
		let sep = ' ';
		let reg = /(\d+)(\d{3})/;
		while( reg.test( nombre)) {
			nombre = nombre.replace( reg, '$1' +sep +'$2');
		}
		return nombre;
	}


	onKey(field: string, value: number) {


		this._dataService.save(field, value);

		this.calcul();
	}

	openDevis() {
		this.nav.setRoot(DevisPage);
	}


	calculTaux(val : number) {
		let interet;
		this.taux.forEach(function(element){
			if(val >= element.duree){
				 interet = element.taux;
				 console.log(element.duree);
			}
		});
		this.datas.interets = interet;
		this._dataService.save('interets', interet); 
	}



}
