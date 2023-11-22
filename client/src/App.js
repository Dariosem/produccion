import { AuthContextProvider } from "./contexts/auth.context";
import MainRouter from "./routes/main.router";

function App() {
  
    return (
      <AuthContextProvider>
          <MainRouter />
      </AuthContextProvider>
    )
}

export default App;
