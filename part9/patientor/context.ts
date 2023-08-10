import { createContext } from "react";
import { Diagnosis } from "./src/types";

const DiagnosesContext = createContext<Diagnosis[]>([]);

export default DiagnosesContext;