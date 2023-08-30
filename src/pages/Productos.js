import { Link, useParams } from "react-router-dom";
import lista_productos from "../data";

function Productos() {
    const { category } = useParams();

    return (
        <div>
            <h1>Pagina Productos</h1>

            <div className="galeria">
                {lista_productos.map((producto) => {
                    if (!category || category == producto.category) {
                        return (
                            <article key={producto.id}>
                                <h5>{producto.title}</h5>
                                <img src={producto.image} alt="productos" />
                                <Link to={`/productos/${producto.id}`}>Mas Info</Link>
                            </article>
                        );
                    }
                }
                )}

            </div>

        </div>

    )

}


export default Productos;