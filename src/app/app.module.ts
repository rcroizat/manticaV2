import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';
//Services
import {DataService} from '../services/data.service';
import {DevisService} from '../services/devis.service';



// Pages
import {MensualitesPage} from '../pages/mensualites/mensualites';
import {NotairePage} from '../pages/notaire/notaire';
import {ResultNotairePage} from '../pages/notaire/result-notaire/result-notaire';
import {DevisPage} from '../pages/devis/devis';
import {CoordonneesPage} from '../pages/devis/coordonnees/coordonnees';
import {SituationPage} from '../pages/devis/situation/situation';
import {BudgetPage} from '../pages/devis/budget/budget';
import {CapacitePage} from '../pages/capacite/capacite';
import {PtzPage} from '../pages/ptz/ptz';
import {ResultPtzPage} from '../pages/ptz/result-ptz/result-ptz';
import {AgencesPage} from '../pages/agences/agences';
import {ContactPage} from '../pages/agences/contact/contact';

@NgModule({
  declarations: [
    MyApp,
    MensualitesPage,
    NotairePage,
    ResultNotairePage,
    DevisPage,
    CoordonneesPage,
    SituationPage,
    BudgetPage,
    CapacitePage,
    PtzPage,
    ResultPtzPage,
    AgencesPage,
    ContactPage
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MensualitesPage,
    NotairePage,
    ResultNotairePage,
    DevisPage,
    CoordonneesPage,
    SituationPage,
    BudgetPage,
    CapacitePage,
    PtzPage,
    ResultPtzPage,
    AgencesPage,
    ContactPage
  ],
  providers: [Storage, DataService, DevisService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
