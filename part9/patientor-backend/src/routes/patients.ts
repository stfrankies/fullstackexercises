import express from "express";
import Data from '../db/data';
import  services  from '../db/services'

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(Data.allPatients);
});

router.get('/:id', (req, res) => {
    res.send(services.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
    try{
        const addedPatient = services.addPatient(req.body);
        res.json(addedPatient);
    }catch(error: unknown){
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;