import {diagnoses, patients} from './data';
import { Diagnoses, Patient } from '../types';
import { v1 as uuid } from 'uuid';


const getDiagnoses = (): Diagnoses[] => {
    return diagnoses;
};

const getPatients = (): Patient[] =>{
    return patients
};

const addPatient = ({name, dateOfBirth, gender, occupation}:Omit<Patient, 'ssn'>  ) => {
   const newPatient: Patient = {
        id: uuid(),
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn: ''
   }
   patients.push(newPatient);
   return newPatient
};

export default {
    getDiagnoses,
    getPatients,
    addPatient
};