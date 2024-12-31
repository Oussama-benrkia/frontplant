export interface UserRequest {
    prenom: string;
    nom: string;
    email: string;
    password: string;
    role?: string;
    file?: File;
  }
  