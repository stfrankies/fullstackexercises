import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";
import Services from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetailsPage from "./components/PatientDetailsPage";


const App = () => {
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await Services.getAllPatients();
      const diagnoses = await Services.getAllDiagnoses()
      setPatients(patients);
      setDiagnoses(diagnoses);
    };
    void fetchPatientList();
  }, []);

  const match = useMatch('/patients/:id')

  const patient = match
    ? patients.find(p => p.id === match.params.id)
    : undefined

  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientDetailsPage patient={patient} diagnosis={diagnoses} />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
