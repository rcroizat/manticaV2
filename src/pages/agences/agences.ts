import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {ContactPage} from './contact/contact';
/*
  Generated class for the AgencesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({  
  selector: 'agences',
  templateUrl: 'agences.html'
})
export class AgencesPage {

private _platform: Platform;
private _isAndroid: boolean;
private _isiOS: boolean;
agences: any[];

  constructor(private nav: NavController, private platform : Platform) {
    this._platform = platform;
  	this._isAndroid = platform.is('android');
  	this._isiOS = platform.is('ios');
    // mail renvoi tout vers contact@mantica.fr pour l instant
    this.agences = 
    [
      {
        nom : 'Saint-Michel sur Orge',
        adresse : '29 rue de Rosières, Immeuble Dimant',
        cp : '91240',
        telString : '01 69 46 10 04',
        tel : '0169461004',
        mail : 'contact@mantica.fr',
        img : 'img/immeuble.jpg',
        shortcut : 'stmichel'
      },
      {
        nom : 'Massy Palaiseau',
        adresse : '8 rue René Cassin',
        cp : '91300',
        telString : '01 69 81 71 06',
        tel : '0169817106',
        mail : 'laurafradin@mantica.fr',
        img : 'img/immeuble.jpg',
        shortcut : 'massy'
      },
      {
        nom : 'Brunoy',
        adresse : '94 route nationale 6',
        cp : '91800',
        telString : '01 60 46 84 26',
        tel : '0160468426',
        mail : 'brunoy@mantica.fr',
        img : 'img/immeuble.jpg',
        shortcut : 'brunoy'
      },
      {
        nom : 'Meulan',
        adresse : '19 bis quai de l\'arquebuse',
        cp : '78250',
        telString : '01 34 74 40 16',
        tel : '0134744016',
        mail : 'patrickchalot@mantica.fr',
        img : 'img/immeuble.jpg',
        shortcut : 'meulan'
      }
    ];
  }

  	map(shortcut : string){
      let destination;
      let label;
      switch (shortcut) {
      case "stmichel":
         destination = '48.628654, 2.312098';
         label = encodeURI('Mantica Saint Michel');
      
      break;
      case "massy":
         destination = '48.723598, 2.285580';
         label = encodeURI('Mantica Massy');
       break;
      case "brunoy":
         destination = '48.689087, 2.483391';
         label = encodeURI('Mantica Brunoy');
       break;
      case "massy":
         destination = '48.723598, 2.285580';
         label = encodeURI('Mantica Massy');
       break;
       default:
        console.log("ERROR switch case default");
      }
     window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
   


  	contact(mail : string, nomAgence : string){
      this.nav.push(ContactPage, {
        contactAgence: mail,
        nomAgence: nomAgence
      });
	  }


 }


