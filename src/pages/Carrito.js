
import { Link } from "react-router-dom";
import { db } from "../components/Firebase/firebase"
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import uuid from 'react-uuid';
import imgEliminar from '../components/CartWidget/assets/eliminar.png';

let carrito = localStorage.getItem("carrito");

const actualizarLocalStorge = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function Carrito() {
    const [itemList, setItemList] = useState([]);
    const [price, updatePrice] = useState([0]);
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
                var precio = 0;
                for (const producto in filteredData) {
                    var productoEnCarrito = carrito.find(o => o.id === filteredData[producto].title);
                    precio += filteredData[producto].price * productoEnCarrito.cantidad;
                }
                updatePrice(precio);
            }

            getItemList();
        } else {
            setItemList([]);
            updatePrice(0);
        }

    }, [counter])

    const handleClickEliminar = event => {
        var producto = carrito.find(o => o.id === event.target.id);
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            carrito = carrito.filter(i => i.id !== event.target.id);
        }
        actualizarLocalStorge(carrito);
        updateCounter(counter + 1);
    };

    const handleClickComprar = async event => {
        for (const indice in itemList) {
            var producto = itemList[indice];
            var productoEnCarrito = carrito.find(o => o.id === producto.title);
            producto.quantity -= productoEnCarrito.cantidad;

            //actualizo stock
            const items = doc(db, 'items', producto.id);
            await setDoc(items, { quantity: producto.quantity }, { merge: true });
        }
        //actualizo carrito
        await setDoc(doc(db, "carritos", uuid()), {
            price: price,
            date: new Date()
        });

        carrito = [];
        actualizarLocalStorge(carrito)
    }

    return (
        <div>
            <h1>Pagina Carrito</h1>

            <div className="galeria">
                {itemList.map((producto) => {

                    var productoEnCarrito = carrito.find(o => o.id === producto.title);
                    var cant = productoEnCarrito != null ? productoEnCarrito.cantidad : 0;
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
            {price > 0 ? (
                <div className="precio">
                    <div>
                        <h2>Precio: ${price}</h2>
                    </div>
                    <div className="comprar">
                        <button onClick={handleClickComprar}>Comprar</button>
                    </div>
                </div>
            ) : (<div className="precio">Agrega productos al carrito!</div>)}
        </div>


    )

}


export default Carrito;