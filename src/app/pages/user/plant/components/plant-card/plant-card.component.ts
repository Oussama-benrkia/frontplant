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
}
