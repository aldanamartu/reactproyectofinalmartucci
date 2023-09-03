import Maia from "../components/Inicio/Maia";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

function Home(){

    return (
        <div>
            <h1>Todo Lindo Tortas</h1>
            <ItemListContainer greeting={'Bienvenidos'}/>
            <Maia/>
        </div>
    )

}


export default Home;