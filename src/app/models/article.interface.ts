export interface Article {
    id: number;
    title: string;
    content: string;
    image: string;
    date: string;
    plante: number[];
}

export interface ArticleResponse {
    content: Article[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
} 