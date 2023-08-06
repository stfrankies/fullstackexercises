export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}