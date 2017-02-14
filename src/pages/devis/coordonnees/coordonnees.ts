import {NavController, AlertController , LoadingController } from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Http }    from '@angular/http';
import {Component, OnInit, Input} from '@angular/core';


import {DevisService} from '../../../services/devis.service';
import {DevisData} from '../../../services/devis';


import {MensualitesPage} from '../../mensualites/mensualites';


@Component({
  	selector: 'coordonnees',
  	templateUrl: 'coordonnees.html'
})

export class CoordonneesPage implements OnInit {

	response: any;
	coordonneesForm : FormGroup;
	nav : NavController;
	@Input()  data: DevisData;




	constructor(private loadingController: LoadingController, form: FormBuilder, private http: Http, nav: NavController, private _devisService: DevisService, public alertCtrl: AlertController ) {
		this.nav = nav;

		this.coordonneesForm = form.group({ // name should match [ngFormModel] in your html
		
			civilite: ["", Validators.required],
			nom: ["", Validators.required],
			prenom: ["", Validators.required],
			telPort: ["", Validators.required],
			mail: ["", Validators.required]
		});
	}


	ngOnInit() {
		this.getDatas();
	}

	getDatas() {
		this.data = this._devisService.getDevisData();
	}
// envoie un post à mailer.php à la racine d'e-mantica PROD
	send() {
		let value = this.data;
		
		this.http.post('http://www.e-mantica.com/appMobile/devisMailerApp.php', JSON.stringify(value))
			.subscribe(res => {
				this.response = res;
				/*let loading = this.loadingController.create({
					content: 'Please wait...',
					dismissOnPageChange : true
				});
					loading.present();*/
					
				if (this.response) {
					let alert = this.alertCtrl.create({
						title: 'Demande envoyée !',
						subTitle: 'Votre demande a bien été envoyé, un de nos experts vous contactera sous peu',
						buttons: [
							{
								text: 'OK',
								handler: () => {
									this.nav.setRoot(MensualitesPage);
								}
							}
						]
					});

					alert.present();

				} else {
					let alert = this.alertCtrl.create({
						title: 'Erreur',
						subTitle: 'Nous sommes désolé, votre mail n\'a pas pu être envoyé, veuillez réessayer plus tard',
						buttons: ['OK']
					});
					alert.present();
				}
			});

	}

	
		
}
