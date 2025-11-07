import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import type { DataContextTypeProps } from "../utilities/type";

export const useData = (): DataContextTypeProps => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used within a DataProvider");
    return ctx;
};
