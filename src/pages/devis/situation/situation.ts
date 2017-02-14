import {NavController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import {BudgetPage} from '../budget/budget';
import {DevisService} from '../../../services/devis.service';
import {DevisData} from '../../../services/devis';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'situation',
  templateUrl: 'situation.html'
})

export class SituationPage implements OnInit {


	situationForm: FormGroup;
	nav: NavController;
	
	@Input() data: DevisData;

	constructor(form: FormBuilder, nav: NavController, private _devisService: DevisService) {
		this.nav = nav;

		this.situationForm = form.group({ // name should match [ngFormModel] in your html
			situationActuelle: ["", Validators.required],
			avancement: ["", Validators.required]
		});
		
	}

	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
	}


	next() {
		this.nav.push(BudgetPage);
	}
		
}
