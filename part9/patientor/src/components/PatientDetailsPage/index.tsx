import React, {useState} from 'react'
import { Female, Male } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";
import axios from 'axios';
import { Patient, Gender, Diagnosis, EntryWithoutId } from "../../types";
import Services from '../../services/patients'
import AddEntryModal from '../AddEntryModal';
import EntryDetails from "./EntryDetails";


interface Props {
    patient : Patient | null | undefined
    diagnosis: Diagnosis[]
}

const PatientDetailsPage  = ({ patient, diagnosis }: Props) : JSX.Element => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    if(patient === undefined || diagnosis === undefined) return(<p>Loading results...</p>)

    //console.log(patient)
    //console.log(diagnosis)

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };
  
    const submitNewEntry = async (values: EntryWithoutId) => {
        try {
            if(patient){
                const entry = await Services.addEntry(patient.id, values);
                patient = {...patient, entries: patient.entries.concat(entry)};
                setModalOpen(false);
            }
        } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };

    const genderPick = (gender: Gender | undefined ) => {
        switch(gender){
            case "female":
                return <Female />;
            case "male":
                return <Male/>;
            default:
                return null;
        }
    }
    
    return(
        <div>
          <Typography component="h5" variant="h5">{patient?.name}{genderPick(patient?.gender)}</Typography>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <h3>entries: </h3>
            {patient?.entries.map(entry => <EntryDetails entry={entry} diagnosis={diagnosis} key={entry.id}/>)}
            <AddEntryModal
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
              modalOpen={modalOpen}
            />
          <Button variant="contained" onClick={() => openModal()}>
              Add New Entry
          </Button>
        </div>
    )
}

export default PatientDetailsPage;