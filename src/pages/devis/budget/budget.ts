import {NavController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

import {DevisService} from '../../../services/devis.service';
import {DevisData} from '../../../services/devis';

import {DataService} from '../../../services/data.service';

import {CoordonneesPage} from '../coordonnees/coordonnees';


@Component({
  	selector: 'budget',
  	templateUrl: 'budget.html'
})

export class BudgetPage implements OnInit{


	budgetForm : FormGroup;
	nav : NavController;
	data: DevisData;

	constructor(form: FormBuilder, nav: NavController, private _devisService: DevisService, private _dataService: DataService) {
		this.nav = nav;

		this.budgetForm = form.group({ // name should match [ngFormModel] in your html
			montant: ["", Validators.required]
		});
	}

	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
		this._dataService.getDatas().then(data => {
			this.data.montant = data[0];
			this.data.notaire = data[8];
			},  rejet => {
				console.log(rejet)
			});
	}
	
	next(){
		this.nav.push(CoordonneesPage);
	}
		
}
