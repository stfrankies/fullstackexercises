import { Patient, Gender, Diagnosis } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography} from "@mui/material";


interface Props {
    patient : Patient | null | undefined
    diagnosis: Diagnosis[]
}

const genderPick = (gender: Gender | undefined ) => {
    switch(gender){
        case "female":
            return <FemaleIcon />;
        case "male":
            return <MaleIcon/>;
        default:
            return null;
    }
}

const PatientDetailsPage = ({ patient, diagnosis }: Props) => {

    if(patient === undefined) return(<p>Loading results...</p>)
    //console.log(patient)
    //console.log(diagnosis)
    
    return(
        <div>
            <Typography component="h5" variant="h5">{patient?.name}{genderPick(patient?.gender)}</Typography>
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <h3>entries: </h3>
            {patient?.entries.map(entry => <span key={entry.id}>{entry.date} {entry.description}
                <ul>{entry.diagnosisCodes?.map((d, i) => <li key={i}>{d} {diagnosis.find(n => n.code === d)?.name}</li>)}</ul>
            </span>)}
        </div>
    )
}

export default PatientDetailsPage;