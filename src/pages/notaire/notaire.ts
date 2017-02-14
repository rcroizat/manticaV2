import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ResultNotairePage} from './result-notaire/result-notaire';


import {FraisNotaire} from '../../data/notaire';
import {FraisNotaireDMTO} from '../../data/notaire';
import {Departements} from '../../data/notaire';

@Component({
    selector: 'notaire',
    templateUrl: 'notaire.html'
})

export class NotairePage {

  nav : NavController;
  storage : Storage;
  result: any;
  montantNotaire: number;
  departement: number;// recup de la vue
  departements: any;//liste avec ville
  localisation: string;
  type: string;
  FraisNotaire: any;
  FraisNotaireDMTO: any;
  deps: string[];
  emoluments_notaire_vue: string;
  droit_et_taxes_sum_vue: string;
  emoluments_formalites_vue: string;
  securite_immobilier_fn_vue:string;
  droits_et_taxes_vue: string;
    

  constructor(storage : Storage, nav: NavController) {
    this.nav = nav;  
    this.FraisNotaire = FraisNotaire;
            
    this.FraisNotaireDMTO = FraisNotaireDMTO;
    this.departements = Departements;
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

  calcul(event:any){

    if(this.type && this.departement && this.montantNotaire){
      if (event) {
        this.montantNotaire = event.target.value;
      }
      

       var tranche1 = this.FraisNotaire.Tranche["0-6500"];
       var tranche2 = this.FraisNotaire.Tranche["6500-17000"];
       var tranche3 = this.FraisNotaire.Tranche["17000-60000"];
       var tranche4 = this.FraisNotaire.Tranche["60000"];
       var majoration_martinique_guadeloupe_guyane = parseFloat(this.FraisNotaire.Majoration["martinique_guadeloupe_guyane"]);
       var majoration_mayotte_reunion = parseFloat(this.FraisNotaire.Majoration["mayotte_reunion"]);
       var tva_metropolitane_et_corse = parseFloat(this.FraisNotaire.TVA["metropolitane_et_corse"]);
       var tva_outre_mer = parseFloat(this.FraisNotaire.TVA["outre_mer"]);
       var emoluments_metropolitane = parseFloat(this.FraisNotaire.Emoluments["metropolitane"]);
       var emoluments_mayotte_reunion = parseFloat(this.FraisNotaire.Emoluments["mayotte_reunion"]);
       var emoluments_martinique_guadeloupe_guyane = parseFloat(this.FraisNotaire.Emoluments["martinique_guadeloupe_guyane"]);
       var securite = parseFloat(this.FraisNotaire.securite);
       var securite_min = parseFloat(this.FraisNotaire.securite_min);

      var taux = [
                 [6500.0, (tranche1 / 100)],
                 [17000.0, (tranche2 / 100)],
                 [60000.0, (tranche3 / 100)],
                 [Number.POSITIVE_INFINITY, (tranche4 / 100)]
             ];

     var emoluments_notaire = 0;
     var droits_et_taxes = 0;
     var emoluments_formalites=0;

     // émoluments du notaire (hors TVA)
     emoluments_notaire+=Math.min(this.montantNotaire,taux[0][0])*taux[0][1];
     emoluments_notaire+=Math.max(Math.min(this.montantNotaire,taux[1][0])-taux[0][0],0.0)*taux[1][1];
     emoluments_notaire+=Math.max(Math.min(this.montantNotaire,taux[2][0])-taux[1][0],0.0)*taux[2][1];
     emoluments_notaire+=Math.max(this.montantNotaire-taux[2][0],0.0)*taux[3][1];


      if (this.departement == 974 || this.departement == 976){
               emoluments_notaire *= (majoration_mayotte_reunion / 100) + 1;
      } else if (this.departement == 971 || this.departement == 972 || this.departement == 973) {
              emoluments_notaire *= (majoration_martinique_guadeloupe_guyane / 100) + 1;
      }

      // TVA sur émoluments (pas de TVA en Guyane)
      if (this.departement == 971 || this.departement == 972 || this.departement == 973 || this.departement == 974 || this.departement == 976 ){
        emoluments_notaire *= (tva_outre_mer / 100) + 1;
        this.localisation = 'Outre-Terre';
      }
      else{
        this.localisation = 'France';
        emoluments_notaire *= ((tva_metropolitane_et_corse / 100) + 1);
      }

       // droits
       //DMTO
      if (this.type == 'neuf') {
        droits_et_taxes += (this.montantNotaire * (this.FraisNotaireDMTO[this.departement]["neuf"] / 100));
      }else{
        droits_et_taxes += (this.montantNotaire * (this.FraisNotaireDMTO[this.departement]["ancien"] / 100));
      }

     //common.droits_et_taxes += (base * (securite / 100));

      var droitettaxes = (this.montantNotaire * (securite / 100));
      if(droitettaxes < securite_min){
       droitettaxes = securite_min;
      }
      var securite_immobilier_fn = droitettaxes;

      // contribution de sécurité immobilière
      var droit_et_taxes_sum =  droits_et_taxes + droitettaxes;

      // émoluments de formalités et débours
      if (this.departement == 974 || this.departement == 976)
      {
          emoluments_formalites += emoluments_mayotte_reunion;
      } 
      else if (this.departement == 971 || this.departement == 972 || this.departement == 973)
      {
          emoluments_formalites += emoluments_martinique_guadeloupe_guyane;
      } 
      else
      {
          emoluments_formalites = emoluments_metropolitane;
      }

      let resultSal = Math.round(emoluments_notaire + droit_et_taxes_sum + emoluments_formalites);



      if(resultSal < 10000000){
        this.result = this.formatMillier(resultSal);
        this.emoluments_notaire_vue = this.formatMillier(Math.round(emoluments_notaire));
        this.emoluments_formalites_vue = this.formatMillier(Math.round(emoluments_formalites));
        this.securite_immobilier_fn_vue = this.formatMillier(Math.round(securite_immobilier_fn));
        this.droits_et_taxes_vue = this.formatMillier(Math.round(droits_et_taxes));
      }else{
        this.result = null;
      }
      this.storage.set('notaire', resultSal);
    }
  }

  detail(){
        this.nav.push(ResultNotairePage, {
            emoluments_notaire: this.emoluments_notaire_vue,
            droit_et_taxes_sum: this.droits_et_taxes_vue,
            emoluments_formalites: this.emoluments_formalites_vue,
            securite_immobilier_fn: this.securite_immobilier_fn_vue,
            result: this.result
        });
  }
}