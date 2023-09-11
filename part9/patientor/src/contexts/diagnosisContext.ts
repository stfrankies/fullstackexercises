import  * as React from "react";
import { Diagnosis } from "../types";

const DiagnosesContext = React.createContext<Diagnosis[]>([]);

export default DiagnosesContext;