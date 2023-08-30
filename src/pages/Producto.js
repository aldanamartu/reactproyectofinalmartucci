import { Link, useParams } from "react-router-dom";
import lista_productos from "../data";

function Producto() {

    const { productoId } = useParams();

    const producto = lista_productos.find((producto) => producto.id == productoId);

    const { image, title, price, description } = producto;

    //console.log(producto);

    return (
        <div className="galeria">
            <img src={image} />
            <h2>{title}</h2>
            <h3>Precio: ${price}</h3>
            <h4>{description}</h4>
            <Link to="/productos">Volver</Link>
        </div>
    )

}


export default Producto;