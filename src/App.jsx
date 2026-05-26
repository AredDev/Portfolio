import Footer from "./components/Footer";
import Navbar from "./components/Nav";
import Router from "./Routes/Route";
import { LanguageProvider } from "./components/LanguageContext";


const App = () => {
  return(
    <LanguageProvider>
      <div className="overflow-x-hidden">
        <Navbar />
          <Router />
        <Footer/>
      </div>
    </LanguageProvider>
  )
}

export default App;