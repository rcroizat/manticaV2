import {Injectable} from '@angular/core';
import {DevisData} from './devis';

@Injectable()
export class DevisService {
	formData: DevisData;

	constructor() {
		this.formData  = {
			projet: null,
			cpProjet: null,
			villeProjet: null,
			typeProjet: null,
			etat: null,
			norme: null,
			bbc: null,
			usage: null,
			situationActuelle: null,
			avancement: null,

			civilite: null,
			nom: null,
			prenom: null,
			cp: null,
			ville: null,
			preference: null,
			telPort: null,
			telFixe: null,
			mail: null,

			montant: null,
			notaire: null,
			budget: null,
		};
	}

	getDevisData() {
		return this.formData;
	}

}