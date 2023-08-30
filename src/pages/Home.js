import Maia from "../components/Inicio/Maia";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

function Home(){

    return (
        <div>
            <h1>Pagina Home</h1>
            <ItemListContainer greeting={'Bienvenidos'}/>
            <Maia/>
        </div>

    )

}


export default Home;