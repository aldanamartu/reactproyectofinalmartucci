
import { Link } from "react-router-dom";
import { db } from "../components/Firebase/firebase"
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import imgEliminar from '../components/CartWidget/assets/eliminar.png';

let carrito = localStorage.getItem("carrito");
let precio = localStorage.getItem("precio");

const actualizarLocalStorge = (carrito, precio) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("precio", JSON.stringify(precio));
}

function Carrito() {
    const [itemList, setItemList] = useState([]);
    const [counter, updateCounter] = useState([0]);
    let items = collection(db, "items");


    if (!carrito || carrito.length == 0) {
        carrito = [];
    } else {
        try {
            carrito = JSON.parse(carrito);
        } catch (error) {
            console.log("carrito ya es json");
        }
    }
    console.log(carrito)

    useEffect(() => {
        var result = [];
        for (var i in carrito) {
            result.push(carrito[i].id);
        }

        if (result.length > 0) {
            const q = query(items, where("title", "in", result));
            const getItemList = async () => {
                const data = await getDocs(q);
                const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setItemList(filteredData);
            }
    
            getItemList();
        } else {
            setItemList([]);
        }
    
    }, [counter])

    const handleClickEliminar = event => {
        console.log(event.target);
        console.log('eliminar producto %i', event.target.id);
        console.log(carrito);

        var producto = carrito.find(o => o.id === event.target.id);
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            carrito = carrito.filter(i => i.id !== event.target.id);
        }
        actualizarLocalStorge(carrito);
        updateCounter(counter + 1);
    };

    return (
        <div>
            <h1>Pagina Carrito</h1>

            <div className="galeria">
                {itemList.map((producto) => {

                    var carritoEnProducto = carrito.find(o => o.id === producto.title);
                    var cant = carritoEnProducto != null ? carritoEnProducto.cantidad : 0;
                    return (
                        <article key={producto.id}>
                            <h5>
                                {producto.title} ({cant} unidades)
                                <img
                                    src={imgEliminar}
                                    style={{ width: '20px', height: '20px' }}
                                    alt='eliminar'
                                    id={producto.title}
                                    onClick={handleClickEliminar} />
                            </h5>
                            <img src={producto.image} alt="productos" />
                            <Link to={`/productos/${producto.id}`}>Mas Info</Link>
                        </article>
                    );
                })}

            </div>
        </div>


    )

}


export default Carrito;