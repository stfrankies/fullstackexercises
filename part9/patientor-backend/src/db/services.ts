import Data from './data';
import { Diagnoses, NoSsnPatient, Patient, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';


const getDiagnoses = (): Diagnoses[] => {
    return Data.allDiagnoses;
};

const getPatients = (): NoSsnPatient[] =>{
    return Data.allPatients
};

const getPatientById = (id: string): Patient | undefined => {
    return Data.allPatients.find(p => p.id === id);
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
   Data.allPatients.push(newPatient);
   return newPatient
};

const addEntry = ( patient: Patient, entry: EntryWithoutId ): Entry => {
    const id = uuid();
    const newEntry = {
        id,
        ...entry
    };

    patient.entries.push(newEntry);
    return newEntry;
};


export default {
    getDiagnoses,
    getPatients,
    addPatient,
    getPatientById,
    addEntry
};