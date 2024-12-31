export interface PlantesRequest {
    name: string;
    description: string;
    utilisation: string;
    region: string;
    precautions: string;
    maladie: number[];
    images?: File;
  }
  