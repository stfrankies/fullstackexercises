import { Patient, Gender } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Typography} from "@mui/material";


interface Props {
    patient : Patient | null | undefined
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

const PatientDetailsPage = ({ patient }: Props) => {
    
   return(
    <div>
       <Typography component="h5" variant="h5">{patient?.name}{genderPick(patient?.gender)}</Typography>
       <p>ssn: {patient?.ssn}</p>
       <p>occupation: {patient?.occupation}</p>
    </div>
   )
}

export default PatientDetailsPage;