import { Route, Routes } from "react-router-dom"
import { useAuthContext } from "../contexts/auth.context"
import NotFound from "../pages/protected/NotFound"
import PublicNotFound from "../pages/auth/PublicNotFound"

function NotFoundRoute({children}) {

  const {isAuthenticated} = useAuthContext()

  const response = isAuthenticated ? <NotFound /> : <PublicNotFound />

  return (
    <Routes>
      {children}
      <Route path="/*" element={response} />
    </Routes>
  )
}
export default NotFoundRoute