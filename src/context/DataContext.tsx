import { createContext } from "react";
import type { DataContextTypeProps } from "../utilities/type";

export const DataContext = createContext<DataContextTypeProps | undefined>(undefined);
