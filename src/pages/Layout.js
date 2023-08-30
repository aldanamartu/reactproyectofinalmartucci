import {Outlet}  from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function Layout(){

    return (
        <div>
            <NavBar/>          
            <Outlet/>
            <footer><div>Todo Lindo, todos los derechos reservados, 2023</div></footer>            
        </div>
    )
}


export default Layout;