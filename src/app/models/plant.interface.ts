export interface Plant {
    id: number;
    name: string;
    description: string;
    region: string;
    utilisation: string;
    precautions: string;
    image: string;
    dateCreated: string;
    maladies: string[];
}

export interface PlantResponse {
    content: Plant[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
} 