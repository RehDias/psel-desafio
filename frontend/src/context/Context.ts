import { createContext } from "react";
import type { ProviderValues } from "../types/Types";

const Context = createContext({} as ProviderValues);

export default Context;