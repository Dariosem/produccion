import React, { Suspense, lazy } from 'react';
import { HashRouter, Navigate, Route } from 'react-router-dom';
import {Usuarios, CreateUsuario, UpdateUsuario} from '../pages/protected/Usuarios';
import { useAuthContext } from '../contexts/auth.context';
import NotFoundRoute from './not-found.route';
import { Loader } from '../components';

const Login = lazy(() => import('../pages/auth/login'));
const ForgotPassword = lazy(() => import('../pages/auth/forgot.password'));
const RecoverPassword = lazy(() => import('../pages/auth/recover.password'));
const PrivateRoutes = lazy(() => import('./private.routes'));
const Dashboard = lazy(() => import('../pages/protected/Dashboard/Dashboard'));
const Agenda = lazy(() => import('../pages/protected/Agenda/Agenda'));
const Perfil = lazy(() => import('../pages/protected/Perfil/perfil'));
const GruposArticulos = lazy(() => import('../pages/protected/GrupoArticulo/GruposArticulos'))
const GrupoArticuloCreate = lazy(() => import('../pages/protected/GrupoArticulo/GrupoArticuloCreate'))
const GrupoArticuloEdit = lazy(() => import('../pages/protected/GrupoArticulo/GrupoArticuloEdit'))
const Almacenes = lazy(() => import('../pages/protected/Almacen/Almacenes'))
const AlmacenCreate = lazy(() => import('../pages/protected/Almacen/AlmacenCreate'))
const AlmacenEdit = lazy(() => import('../pages/protected/Almacen/AlmacenEdit'))
const Articulos = lazy(() => import('../pages/protected/Articulo/Articulos'))
const ArticuloCreate = lazy(() => import('../pages/protected/Articulo/ArticuloCreate'))

const MainRouter = () => {

  const { user, isAdmin, isSupervisor, isOperario} = useAuthContext()
  return (
    <Suspense fallback={<Loader />} >
      <HashRouter>
        <NotFoundRoute>

          <Route index element={<Navigate to='/agenda' />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path='/agenda' element={<Agenda />} />
          <Route element={<PrivateRoutes isAllowed={!!user} />}>
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/perfil/:userId' element={<Perfil />} />
          </Route>

          <Route element={<PrivateRoutes isAllowed={!!user && (isAdmin || isSupervisor || isOperario)} redirectTo='/dashboard' />}>

            <Route path="/grupo-articulos" element={<GruposArticulos />} />
            <Route path="/grupo-articulos/create" element={<GrupoArticuloCreate />} />
            <Route path="/grupo-articulos/update/:id" element={<GrupoArticuloEdit />} />
          </Route>

          <Route element={<PrivateRoutes isAllowed={!!user && (isAdmin || isSupervisor)} redirectTo='/dashboard' />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/articulos/create" element={<ArticuloCreate />} />
            <Route path="/articulos/update/:id" element={<ArticuloCreate />} />
          </Route>

          <Route element={<PrivateRoutes isAllowed={!!user && isAdmin} redirectTo='/dashboard' />}>
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/create" element={<CreateUsuario />} />
            <Route path="/usuarios/update/:id" element={<UpdateUsuario />} />
            <Route path="/almacenes" element={<Almacenes />} />
            <Route path="/almacenes/create" element={<AlmacenCreate />} />
            <Route path="/almacenes/update/:id" element={<AlmacenEdit />} />
          </Route>
          
        </NotFoundRoute>
      
      </HashRouter>
    </Suspense>
  )
}

export default MainRouter