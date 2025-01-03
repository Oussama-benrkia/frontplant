import { Component, Input } from '@angular/core';
import { PlantesResponse } from '../../../../../interfaces/plantes/plantes-response.interface';


@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.css']
})
export class PlantCardComponent {
  @Input() plant!: PlantesResponse;
}
