import express from "express";
import { diagnoses } from '../db/data';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnoses);
});

export default router;