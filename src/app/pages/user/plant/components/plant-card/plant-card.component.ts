import { Component, Input } from '@angular/core';
import { PlantesResponse } from '../../../../../interfaces/plantes/plantes-response.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.css']
})
export class PlantCardComponent {
  constructor(private route:Router){}
  @Input() plant!: PlantesResponse;
  nav(){
    this.route.navigate(['/user/plants',this.plant.id])
}
getImageForPlant(plantName: string): string {
  const imageMapping: { [key: string]: string } = {
    'Menthe': 'assets/menthe-poivree.jpeg',
    'Citron': 'assets/Citronnier.jpg',
    'Camomille': 'assets/camomille.jpg',
    'Curcuma': 'assets/curcuma.jpg',
    'Eucalyptus': 'assets/eucalyptus.webp',
    'Aloe Vera': 'assets/aloevera.jpg',
    'Gingembre': 'assets/gingembre.jpg',
    'Lavande': 'assets/lavande.jpg',
    'Fenouil': 'assets/fenouil.jpg',
    'Ail': 'assets/ail.jpg',
    'Romarin': 'assets/romarin.jpg',
    'Saule': 'assets/saule.jpg',
    'Ginseng': 'assets/ginseng.jpg',
    'Ortie': 'assets/ortie.jpg',
    'Citronnelle': 'assets/citr.webp',
    'Ginkgo': 'assets/ginkgo.webp',
    'Passiflore': 'assets/passiflore.webp',
    'Thym': 'assets/thym.jpg',
    'Échinacée': 'assets/echinacee.jpg',
    'Arnica': 'assets/arnica.jpg'
  };

  return imageMapping[plantName] || 'assets/default.jpeg';
}
}
