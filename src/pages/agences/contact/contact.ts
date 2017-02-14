import { Component } from '@angular/core';
import {NavController, AlertController , LoadingController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Http }    from '@angular/http';
import {AgencesPage} from '../agences';

/*
  Generated class for the ContactPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	contactForm:FormGroup;
	subject: string;
	message: string;
	response: any;
	nav : NavController;
	contactAgence : string;
	nomAgence : string;

	constructor(form: FormBuilder, public params : NavParams, private loadingController: LoadingController, private http: Http, nav: NavController, public alertCtrl: AlertController ) {
		this.nav = nav;
  		this.contactAgence = params.get('contactAgence'); // mail de l'agence clickée désactivé car Pascal veut que tout passe par saint michel (contact@mantica.fr)
  		this.nomAgence = params.get('nomAgence');
  		this.contactForm = form.group({ // name should match [ngFormModel] in your html
			subject: ["", Validators.required],
			message: ["", Validators.required],
			nom: ["", Validators.required],
			prenom: ["", Validators.required],
			tel: ["", Validators.required],
			mail: ["", Validators.required]
		});

	}


  send(subject : string, message: string, nom: string, prenom: string, tel: number, mail: string){

	let data = { 
		"subject": subject, 
		"message": message,
		"nom": nom,
		"prenom": prenom,
		"tel": tel,
		"mail": mail,
		"contactAgence": "contact@mantica.fr",
		"nomAgence": this.nomAgence
	};

	this.http.post('http://www.e-mantica.com/appMobile/mailAgenceApp.php', JSON.stringify(data))
		.subscribe(res => {
			this.response = res;
/*			let loading = this.loadingController.create({
				content: 'Please wait...',
				dismissOnPageChange : true
			});
				loading.present();
				*/
			if (this.response) {
				let alert = this.alertCtrl.create({
					title: 'Votre message a bien été envoyé',
					subTitle: 'Nous vous recontacterons très prochainement',
					buttons: [
						{
							text: 'Ok',
							handler: () => {
								this.nav.setRoot(AgencesPage);
							}
						}
					]
				});

				alert.present();

			} else {
				let alert = this.alertCtrl.create({
					title: 'Erreur',
					subTitle: 'Nous sommes désolé, votre mail n\'a pas pu être envoyé, veuillee réessayer plus tard',
					buttons: ['Ok']
				});
				alert.present();
			}
		});

  }


}
