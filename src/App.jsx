import Footer from "./components/Footer";
import Navbar from "./components/Nav";
import Router from "./Routes/Route";


const App = () => {
  return(
    <div className="overflow-x-hidden">
      <Navbar />
        <Router />
      <Footer/>
    </div>
  )
}

export default App;