import { Navigate, Outlet } from 'react-router-dom';
import { DataContextProvider } from '../contexts';

const PrivateRoutes = ({isAllowed, redirectTo = "/agenda", children,}) => {

    if( !isAllowed ){
        return <Navigate to={redirectTo} replace />
    }
    return <DataContextProvider>
        {children ? children : <Outlet />}
    </DataContextProvider>;
}

export default PrivateRoutes