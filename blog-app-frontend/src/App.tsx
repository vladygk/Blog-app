import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./containers/MainContent/MainContent";
import Footer from "./containers/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <Navbar />
      <MainContent>
        <AppRoutes/>
      </MainContent>
      <Footer />
    </>
  );
}

export default App;
