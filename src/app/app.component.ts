import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


//Services
import {DataService} from './services/data.service';
import {DevisService} from './services/devis.service';


// Pages
import {MensualitesPage} from '../pages/mensualites/mensualites';
import {NotairePage} from '../pages/notaire/notaire';
import {DevisPage} from '../pages/devis/devis';
import {CoordonneesPage} from '../pages/devis/coordonnees/coordonnees';
import {CapacitePage} from '../pages/capacite/capacite';
import {PtzPage} from '../pages/ptz/ptz';
import {AgencesPage} from '../pages/agences/agences';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MensualitesPage;
  pages: Array<{title: string, component: any}>
  constructor( private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Calcul des mensualités', component: MensualitesPage },
      { title: 'Capacité d\'emprunt', component: CapacitePage },
      { title: 'Demande de devis', component: DevisPage },
      { title: 'Frais de notaire', component: NotairePage },
      { title: 'Prêt à taux zéro', component: PtzPage },
      { title: 'Nos agences', component: AgencesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
