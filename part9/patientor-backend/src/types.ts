export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: "male" | "female" | "other";
    occupation: string;
}

//export type NewPatient = Omit<Patient, 'ssn'>;