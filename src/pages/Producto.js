import { Link, useParams } from "react-router-dom";
import { db } from "../components/Firebase/firebase"
import { getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react";

function Producto() {

    const { productoId } = useParams();
    const itemsCollectionRef = collection(db, "items");
    const [ producto, setProducto ] = useState([]);

    useEffect(() => {
        const getItemProducto = async () => {
            const data = await getDocs(itemsCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            const producto = filteredData.find((producto) => producto.id == productoId);
            setProducto(producto);
        }

        getItemProducto();
    }, [])
    
    const { image, title, price, description } = producto;
    //console.log(producto);

    return (
        <div className="galeria">
            <img src={image} />
            <h2>{title}</h2>
            <h4>Precio: ${price}</h4>
            <h6>{description}</h6>
            <Link to="/productos">Volver</Link>
        </div>
    )

}

export default Producto;