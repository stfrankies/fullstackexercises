import {diagnoses, patients} from './data';
import { Diagnoses, NoSsnPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';


const getDiagnoses = (): Diagnoses[] => {
    return diagnoses;
};

const getPatients = (): NoSsnPatient[] =>{
    return patients
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = ({name, dateOfBirth, gender, occupation, entries}: NoSsnPatient ) => {
   const newPatient: NoSsnPatient = {
        id: uuid(),
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
   }
   patients.push(newPatient);
   return newPatient
};

export default {
    getDiagnoses,
    getPatients,
    addPatient,
    getPatientById
};