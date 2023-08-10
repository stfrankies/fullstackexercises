import { Patient, Gender, Diagnosis } from "../../types";
import { Female, Male } from "@mui/icons-material";
import { Typography } from "@mui/material";
import EntryDetails from "./EntryDetails";


interface Props {
    patient : Patient | null | undefined
    diagnosis: Diagnosis[]
}

const PatientDetailsPage = ({ patient, diagnosis }: Props) => {

    if(patient === undefined || diagnosis === undefined) return(<p>Loading results...</p>)

    //console.log(patient)
    //console.log(diagnosis)

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
        </div>
    )
}

export default PatientDetailsPage;