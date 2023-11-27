import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./containers/MainContent/MainContent";
import Footer from "./containers/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import AuthContext from './context/AuthContext'
import LocalStorage from "./utils/LocalStorage";
import { useEffect, useState } from "react";
import JwtTokenHandler from "./utils/JwtTokenHandler";

function App() {
  const [token, setToken] = useState(LocalStorage.getFromStorage());
  const [username, setUsername] = useState(() => JwtTokenHandler.getJwtPayload(token));

  useEffect(() => {
    setUsername(() => JwtTokenHandler.getJwtPayload(token));
  }, [token]);

  return (
    <AuthContext.Provider value={{username:username,token:token ?? '', setToken: setToken}}>
      <Navbar />
      <MainContent>
        <AppRoutes/>
      </MainContent>
      <Footer />
      </AuthContext.Provider>
  );
}

export default App;
