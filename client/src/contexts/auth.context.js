import { createContext, useMemo, useCallback, useState, useContext } from "react";
import { getLogin } from "../services/auth.service";

export const AuthContext = createContext();

export function AuthContextProvider({children}){
    const localUser = JSON.parse(localStorage.getItem('user'))
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuth') ?? false);
    const [loginError, setLoginError] = useState('');
    const [user, setUser] = useState(localUser ?? null);
    const [isAdmin, setIsAdmin] = useState( localUser ? localUser.role.rolename === 'Administrador' : false);
    const [isSupervisor, setIsSupervisor] = useState(localUser ? localUser.role.rolename === 'Profesional' : false);
    const [isOperario, setIsOperario] = useState(localUser ? localUser.role.rolename === 'Secretaria' : false);

    const login = useCallback( async ({dni, password}) => {
        const resp = await getLogin(dni, password);
        if(resp.status === 200){
            window.localStorage.setItem('isAuth', true);
            window.localStorage.setItem('token', resp.data.token);
            window.localStorage.setItem('user', JSON.stringify(resp.data.user));
            setIsAuthenticated(true);
            setUser(resp.data.user);
            if(resp.data.user.role.rolename === 'Administrador'){ setIsAdmin(true)}
            if(resp.data.user.role.rolename === 'Profesional'){ setIsSupervisor(true)}
            if(resp.data.user.role.rolename === 'Secretaria'){ setIsOperario(true)}
        } else if(resp.status === 400){ 
            resp.data.error.forEach(err => setLoginError(err));
                
        } else {
            setLoginError(resp.data.error);
        }
    },[]);

    const logout = useCallback(() => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false)
        setIsSupervisor(false)
        setIsOperario(false)
    },[]);

    const getUser = () => {
        return JSON.parse(window.localStorage.getItem('user')) || null
    }

    const value = useMemo(()=>({
        login, logout, isAuthenticated, loginError, setLoginError, getUser, user, isAdmin, isSupervisor, isOperario
    }), [login, logout, isAuthenticated, loginError, setLoginError, getUser, user, isAdmin, isSupervisor, isOperario]);

    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export const useAuthContext = () => useContext(AuthContext)