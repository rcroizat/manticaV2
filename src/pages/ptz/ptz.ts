import {NavController} from 'ionic-angular';
/*import {ZonageService} from '../../services/zonage.service';
import {ZoneData} from '../../services/zones';*/

import {Component} from '@angular/core';

import {ResultPtzPage} from './result-ptz/result-ptz';


import {ValuesPTZ} from '../../data/zonage';
import {Ville} from '../../data/ville';

@Component({
  selector: 'ptz',
  templateUrl: 'ptz.html'
})


export class PtzPage {

  nav : NavController;
	valuesPTZ : Ville[];
	elements : any[];
	zoneCut : any[];
	zoneField : string;
	villePtz : string;
  zoneptz : any;
	bienPtz : string;
 	nbrPers:number;

  reponse : boolean = false;

	coeff_ptz: any;
	quantite_maximale_du_pret_neuf: any;
	quantite_maximale_du_pret_ancien: any;
	quantite_maximale_du_pret_hlm: any;
	plafond_de_ressources: any;
	tranches: any;
	plafond_de_operation: any;
	coeff_rev_forf: any;
	montant_retenu: number;
  coeff_familial: number; 
  revenu_familiales:number;


	coeff_evaluation_forfaitaire_du_revenu : number = 9;
	
  constructor(nav: NavController) {
	  this.initialiseItems();
    this.nav = nav;	
  };

 	get_cdr(champ : string, zone : string, revenu_fam : number) {
    	for (let i = 1; i < 4; ++i) {
        	if (revenu_fam <= this.tranches[i][zone]){
            return this.tranches[i][champ];
          }
	    }
	};
 zoneFromNumber(zone : number) : string {
    var b = "C";
       switch (zone) {
           case 1:
                b =  "A";
               break;
           case 2:
                b =   "B1";
               break;
           case 3:
                b =   "B2";
               break;
           case 4:
                b =   "C";
               break;
           default:
                b =   "C";;
       }
       return b;
   };

  get_tr(cout_op, rfr, nbpers, typo, ptzParam) {
    this.montant_retenu = Math.max(rfr, (cout_op / 9));
    this.coeff_familial = this.coeff_ptz[nbpers];
    this.revenu_familiales = this.montant_retenu / this.coeff_familial;
   
    let plafond_controle = this.get_cdr(this.zoneptz,this.zoneptz,this.revenu_familiales);
    
    if (this.revenu_familiales <= plafond_controle /*&& cout_op <= plafond_de_operation[zoneptz][nbpers]*/) {
        let i = 1;
        return i;
    }else{
    	return -1;
    };
  };


  is_allowed_ptz(cout_op, rfr, nbpers, typo, zoneptz) {
    return this.get_tr(cout_op, rfr, nbpers, typo, zoneptz) != -1;
  };


  CalculPTZ( revenu_fiscale, cout_operation, apport, etat) {
    cout_operation = (+cout_operation) - (+apport);

    if(revenu_fiscale!=0){
      revenu_fiscale = revenu_fiscale.replace(/ /g, '');
  };

    let nbpers = this.nbrPers;
    let rfr = parseFloat(revenu_fiscale);
    let cout = parseFloat(cout_operation);
    let bDOM = false;
    this.zoneptz = this.zoneField;


    /* pas propre 
    common.ptz_init(); */// <<<<=   UNDEFINED ROMAIN
    let PTZValueParam = {
      "coeff_ptz":{"1":1,"2":1.4,"3":1.7,"4":2,"5":2.3,"6":2.6,"7":2.9,"8":3.2},
    "quantite_maximale_du_pret_neuf":{"A":40,"B1":40,"B2":40,"C":40},
    "quantite_maximale_du_pret_ancien":{"A":40,"B1":40,"B2":40,"C":40},
    "quantite_maximale_du_pret_hlm":{"A":10,"B1":10,"B2":10,"C":10},
    "plafond_de_ressources":{
    "1":{"1":37000,"2":51800,"3":62900,"4":74000,"5":85100,"6":96200,"7":107300,"8":118400},
    "2":{"1":30000,"2":42000,"3":51000,"4":60000,"5":69000,"6":78000,"7":87000,"8":96000},
    "3":{"1":27000,"2":37800,"3":45900,"4":54000,"5":62100,"6":70200,"7":78300,"8":86400},
    "4":{"1":24000,"2":33600,"3":40800,"4":48000,"5":55200,"6":62400,"7":69600,"8":76800}},
    "plafond_de_operation":{
        "1":{"1":150000,"2":210000,"3":255000,"4":300000,"5":345000,"6":345000,"7":345000,"8":345000},
        "2":{"1":135000,"2":189000,"3":230000,"4":270000,"5":311000,"6":311000,"7":311000,"8":311000},
        "3":{"1":110000,"2":154000,"3":187000,"4":220000,"5":253000,"6":253000,"7":253000,"8":253000},
        "4":{"1":100000,"2":140000,"3":170000,"4":200000,"5":230000,"6":230000,"7":230000,"8":230000}
      },
      "coeff_evaluation_forfaitaire_du_revenu":9,
      "tranches":{
          "1":{"A":22000,"B1":19500,"B2":16500,"C":14000,"duree_tot":300,"montant_diff":100,"periode_diff":180,"periode_remb":120},
          "2":{"A":25000,"B1":21500,"B2":18000,"C":15000,"duree_tot":264,"montant_diff":100,"periode_diff":120,"periode_remb":144},
          "3":{"A":37000,"B1":30000,"B2":27000,"C":24000,"duree_tot":240,"montant_diff":100,"periode_diff":60,"periode_remb":180},
          "4":{"A":0,"B1":0,"B2":0,"C":0,"duree_tot":0,"montant_diff":0,"periode_diff":0,"periode_remb":0},
          "5":{"A":0,"B1":0,"B2":0,"C":0,"duree_tot":0,"montant_diff":0,"periode_diff":0,"periode_remb":0},
          "6":{"A":0,"B1":0,"B2":0,"C":0,"duree_tot":0,"montant_diff":0,"periode_diff":0,"periode_remb":0},
          "7":{"A":0,"B1":0,"B2":0,"C":0,"duree_tot":0,"montant_diff":0,"periode_diff":0,"periode_remb":0},
          "8":{"A":0,"B1":0,"B2":0,"C":0,"duree_tot":0,"montant_diff":0,"periode_diff":0,"periode_remb":0},
          "9":{"A":0,"B1":0,"B2":0,"C":0,"duree_tot":0,"montant_diff":0,"periode_diff":0,"periode_remb":0},
          "10":{"A":0,"B1":0,"B2":0,"C":0,"duree_tot":0,"montant_diff":0,"periode_diff":0,"periode_remb":0}
      }
      };
    /* d'apres le console log sur l anil */

    let arr = PTZValueParam;
    //New vars
    this.coeff_ptz = arr.coeff_ptz;
    this.quantite_maximale_du_pret_neuf = arr.quantite_maximale_du_pret_neuf;
   	this.quantite_maximale_du_pret_ancien = arr.quantite_maximale_du_pret_ancien;
    this.quantite_maximale_du_pret_hlm = arr.quantite_maximale_du_pret_hlm;
    this.coeff_evaluation_forfaitaire_du_revenu = arr.coeff_evaluation_forfaitaire_du_revenu;
    this.plafond_de_ressources = arr.plafond_de_ressources;
    this.plafond_de_operation = arr.plafond_de_operation;
    this.tranches = arr.tranches;

    this.coeff_familial = this.coeff_ptz[nbpers];
    this.coeff_rev_forf = this.coeff_evaluation_forfaitaire_du_revenu;
    this.montant_retenu = Math.max(rfr, cout / this.coeff_rev_forf);
    this.revenu_familiales = this.montant_retenu / this.coeff_familial;


    //Outuput

    if (this.is_allowed_ptz(cout, rfr, nbpers, 0 , this.zoneptz)) {   



    switch (this.zoneptz) {
      case "A":
      case "Abis":
        this.zoneptz = 1;
      break;
      case "B1":
        this.zoneptz = 2;
      break;
      case "B2":
        this.zoneptz = 3;
      break;
      case "C":
        this.zoneptz = 4;
      break;
      case "DOM":
        {
        bDOM = true;
        this.zoneptz = 3;
        }
      break;
    }

    this.coeff_familial = this.coeff_ptz[nbpers];
    this.montant_retenu = Math.max(rfr, cout / 9);
    this.revenu_familiales = this.montant_retenu / this.coeff_familial;

      if (cout < this.plafond_de_operation[this.zoneptz][nbpers]) {

      } else {
          cout = this.plafond_de_operation[this.zoneptz][nbpers];
      };


        var zone = this.zoneFromNumber(this.zoneptz);
        var montant_max_ptz_neuf = (cout * this.quantite_maximale_du_pret_neuf[zone]) / 100;
        var montant_max_ptz_ancien = (cout * this.quantite_maximale_du_pret_ancien[zone]) / 100;
        var montant_max_ptz_hlm = (cout * this.quantite_maximale_du_pret_hlm[zone]) / 100;
        var revenu_familiales = this.montant_retenu / this.coeff_familial;
        var dure_tot_remb = this.get_cdr("duree_tot", zone, this.revenu_familiales);
        var dure_du_differe = this.get_cdr("periode_diff", zone, revenu_familiales); //Periode re remb
        var periode_de_remboursement = this.get_cdr("periode_remb", zone, revenu_familiales);
        var montant_differe = this.get_cdr("montant_diff", zone, revenu_familiales); //differe d'armotissement
        
        var mensualite_premiere_neuf = (montant_max_ptz_neuf * ((100 - montant_differe) / 100)) / dure_du_differe;
        var mensualite_premiere_ancien = (montant_max_ptz_ancien * ((100 - montant_differe) / 100)) / dure_du_differe;
        var mensualite_premiere_hlm = (montant_max_ptz_hlm * ((100 - montant_differe) / 100)) / dure_du_differe;
        
        var mensualite_seconde_neuf_hlm = (montant_max_ptz_hlm * (montant_differe / 100)) / (periode_de_remboursement);
        var mensualite_seconde_neuf = (montant_max_ptz_neuf * (montant_differe / 100)) / (periode_de_remboursement);
        var mensualite_seconde_ancien = (montant_max_ptz_ancien * (montant_differe / 100)) / (periode_de_remboursement);
        
        var dure_total_de_remboursement = dure_du_differe + periode_de_remboursement;



         if(this.bienPtz == 'neuf'){
           var coutMax = (cout * this.quantite_maximale_du_pret_neuf[zone]) / 100;
           var premiere = mensualite_premiere_neuf;
           var seconde = mensualite_seconde_neuf;
         }else if(this.bienPtz == 'hlm'){
           var coutMax =  (cout * this.quantite_maximale_du_pret_hlm[zone]) / 100;
           var premiere = mensualite_premiere_hlm;
           var seconde = mensualite_seconde_neuf_hlm;
         }else if(this.bienPtz == 'ancienTravaux'){
           var coutMax =  (cout * this.quantite_maximale_du_pret_ancien[zone]) / 100;
           var premiere = mensualite_premiere_ancien;
           var seconde = mensualite_seconde_ancien;
         }

console.log(montant_differe);

        this.nav.push(ResultPtzPage, {
            bien: this.bienPtz,
            dure_tot_remb: dure_tot_remb,
            dure_total_de_remboursement: dure_total_de_remboursement,
            montant_differe: montant_differe,
            coutMax: coutMax,
            premiere: premiere,
            seconde: seconde,
            dure_du_differe: dure_du_differe
        });

       /* scope.model['success_box_messages_ptz'] = true;
        scope.model["montant_maximum_1"] = mtr.number_format(montant_max_ptz_neuf, 0, ',', ' ');
        scope.model["montant_maximum_ancien"] = mtr.number_format(montant_max_ptz_ancien, 0, ',', ' ');
        scope.model["montant_maximum_2"] = mtr.number_format(montant_max_ptz_hlm, 0, ',', ' ');
        scope.model["dt1"] = mtr.number_format(dure_tot_remb / 12, 0, ',', ' ');
        scope.model["dt2"] = mtr.number_format(dure_tot_remb / 12, 0, ',', ' ');
        scope.model["td1"] = mtr.number_format(montant_differe, 0, ',', ' ');
        scope.model["td2"] = mtr.number_format(montant_differe, 0, ',', ' ');
        scope.model["dd1"] = mtr.number_format(dure_du_differe, 0, ',', ' ');
        scope.model["dd2"] = mtr.number_format(dure_du_differe, 0, ',', ' ');
        scope.model["mensPTZ1_1"] = mtr.number_format(Math.round(mensualite_premiere_neuf), 0, ',', ' ');
        scope.model["mensPTZ1_2"] = mtr.number_format(Math.round(mensualite_premiere_hlm), 0, ',', ' ');
        scope.model["mensPTZ1_ancien"] = mtr.number_format(Math.round(mensualite_premiere_ancien), 0, ',', ' ');
        scope.model["mensPTZ2_1"] = mtr.number_format(Math.round(mensualite_seconde_neuf), 0, ',', ' ');
        scope.model["mensPTZ2_ancien"] = mtr.number_format(Math.round(mensualite_seconde_ancien), 0, ',', ' ');
        scope.model["mensPTZ2_2"] = mtr.number_format(Math.round(mensualite_seconde_neuf_hlm), 0, ',', ' ');
        scope.model['error_message_ptz'] = false;*/
    } else {/*
        scope.model['success_box_messages_ptz'] = false;
        scope.model['error_message_ptz'] = true;*/
         this.reponse = true;
    };

};

  getItems(ev) {

    let val = ev.target.value;

      if (val && val.trim() != '') {
        this.elements = this.valuesPTZ.filter((field) => {
          return (field.ville.toLowerCase().indexOf(val.toLowerCase()) == 0);
        })
      }else{
      	this.elements = [];
      };

  	this.zoneCut = this.elements.slice(0, 3);
   }

   insertInput(zone){
   	this.villePtz = zone.ville;
   	this.zoneField = zone.zone;
   	this.zoneCut = [];
   }

   


  initialiseItems(){
  	this.elements = [];
  	this.zoneCut = [];

	  this.valuesPTZ = ValuesPTZ;


  }
	

}
 