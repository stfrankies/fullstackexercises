import express from "express";
import { patients } from '../db/data';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log(patients)
    res.send(patients);
});

export default router;