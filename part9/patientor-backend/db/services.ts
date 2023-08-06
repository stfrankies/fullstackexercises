import {diagnoses, patients} from '../db/data';

import { Diagnoses, Patients } from '../src/types';


const getDiagnoses = (): Diagnoses[] => {
    return diagnoses;
};

const getPatients = (): Patients[] =>{
    return patients
}
export default {
    getDiagnoses,
    getPatients
};