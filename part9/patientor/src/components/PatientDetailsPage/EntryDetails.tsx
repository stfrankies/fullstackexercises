import { Diagnosis, Entry, HealthCheckRating } from "../../types";
import { Favorite, Work, MedicalServices } from "@mui/icons-material";
import { Box} from "@mui/material";


interface Props {
    entry : Entry
    diagnosis: Diagnosis[]
}

const EntryType = ({ entry } : {entry: Entry}) =>{

    console.log(entry)

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    const HealthRating = (health: HealthCheckRating) => {
        switch(health){
            case 0:
                return <Favorite sx={{ color: "green" }}/>;
            case 1:
                return <Favorite sx={{ color: "yellow" }}/>;
            case 2:
                return <Favorite sx={{ color: "blue" }}/>;
            case 3:
                return <Favorite sx={{ color: "green" }}/>;
        }
    }    

    switch(entry.type){
        case "HealthCheck": 
            return (
                <div>{HealthRating(entry.healthCheckRating)}</div>
            );
        case "Hospital":
            return (
                <div>
                    <p>Discharge date: {entry.discharge.date}</p>
                    <ul>
                    <li>criteria: <i>{entry.discharge.criteria}</i></li> 
                    </ul>
                    
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div>
                    {entry.sickLeave? 
                        <p>SICK LEAVE: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
                        : null
                    }
                </div>
            );
        default:
            return assertNever(entry);
    }
}

const EntryDetails = (props: Props) => {    

    return(
    
    <Box sx={{ border: '1px solid grey', borderRadius: 4, padding: 2, margin: 1  }} >
        <p>{props.entry.date}</p>
        {props.entry.type === "OccupationalHealthcare" ?
            props.entry.employerName ? 
                <p>
                     <Work/> {props.entry.employerName} 
                </p> 
                : <Work /> 
            : <MedicalServices />
        }
        <p><i>{props.entry.description}</i></p>
        <ul>
            {props.entry.diagnosisCodes?.map(d => {
                const diagnosis = props.diagnosis.find(diagnose => diagnose.code === d)?.name
                return ( 
                <li key={d}>{d} {diagnosis? diagnosis : null}</li> 
                )
              }
            )}
         </ul>

         <EntryType entry={props.entry}/><p>diagnosed by {props.entry.specialist}</p>
      </Box>
    )
}

export default EntryDetails