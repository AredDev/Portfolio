import Accueil from "../components/Accueil";
import Competence from "../components/Competence";
import Projet from "../components/projet";


const Home = () => {
    return(
        <div className="overflow-hidden bg-white">
            <Accueil/>
            <Competence/>
            <Projet/>
        </div>
    )
}


export default Home;