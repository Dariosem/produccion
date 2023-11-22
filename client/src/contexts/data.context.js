import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { getAll } from "../services";

export const DataContext = createContext();

export function DataContextProvider({children}){
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getRoles();
    }

    const getRoles = async () => {
        const roles = await getAll('roles');
        setRoles(roles.data);
    }
    
    

    const value = useMemo(()=>({
        roles
    }), [
        roles
    ]);

    
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>

}

export const useDataContext = () => useContext(DataContext)