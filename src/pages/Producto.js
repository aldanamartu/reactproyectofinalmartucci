import { Link, useParams } from "react-router-dom";
import { db } from "../components/Firebase/firebase"
import { getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react";
import QuantityPicker from "../components/Common/QuantityPicker"

function Producto() {

    const { productoId } = useParams();
    const itemsCollectionRef = collection(db, "items");
    const [producto, setProducto] = useState([]);

    useEffect(() => {
        const getItemProducto = async () => {
            const data = await getDocs(itemsCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            const producto = filteredData.find((producto) => producto.id == productoId);
            setProducto(producto);
        }

        getItemProducto();
    }, [])

    const handleClick = (id) => {
        const cantidad = parseInt(document.getElementById("quantitySelected").innerHTML);
        console.log("agregar %i", cantidad);
        let carrito = localStorage.getItem("carrito");
        if (!carrito || carrito.length == 0) {
            carrito = [];
        } else {
            carrito = JSON.parse(carrito);
        }
        let productoEnCarrito = carrito.filter(function (item) {
            return item.id == id;
        });
        if (productoEnCarrito.length > 0) {
            productoEnCarrito[0].cantidad += cantidad;
        } else {
            var producto = { id: id, cantidad: cantidad };
            carrito.push(producto);
        }
        actualizarLocalStorge(carrito);
        console.log(carrito);

    }

    const actualizarLocalStorge = (carrito, precio) => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("precio", JSON.stringify(precio));
    }

    const { id, image, title, price, quantity, description } = producto;
    console.log(producto);
    return (
        <div className="galeria">
            <img src={image} />
            <h2>{title}</h2>
            <h5>Precio: ${price}</h5>
            <h5>Cantidad: {quantity} unidades</h5>
            <h6>{description}</h6>
            <QuantityPicker quantity={quantity} />
            <button onClick={() => handleClick(title)}>Agregar a carrito</button>
            <Link to="/productos">Volver</Link>
        </div>
    )

}

export default Producto;