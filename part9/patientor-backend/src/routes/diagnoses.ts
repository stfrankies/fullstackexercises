import express from "express";
import Data from '../db/data';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(Data.allDiagnoses);
});

export default router;