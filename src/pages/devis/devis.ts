import {NavController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {SituationPage} from './situation/situation';

import {DevisService} from '../../services/devis.service';
import {DevisData} from '../../services/devis';

import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'devis',
  templateUrl: 'devis.html'
})

export class DevisPage implements OnInit  {


	devisForm : FormGroup;
	nav : NavController;
	@Input() data: DevisData;
	constructor(form: FormBuilder, nav: NavController, private _devisService: DevisService) {
		this.nav = nav;
		this.devisForm = form.group({ // name should match [ngFormModel] in your html
			projet: ["", Validators.required],
			cpProjet: ["", Validators.pattern('[0-9]{5}')],
			villeProjet: ["", Validators.required],
			typeProjet: ["", Validators.required],
			etat: ["", Validators.required],
			usage: ["", Validators.required]
		});



	}


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
		console.log(this.devisForm)
	}


	next(){
	
		this.nav.push(SituationPage);

	}
	

}
