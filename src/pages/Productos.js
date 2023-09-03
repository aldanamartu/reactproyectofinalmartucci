import { Link, useParams } from "react-router-dom";
import { db } from "../components/Firebase/firebase"
import { getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react";

function Productos() {
    const { category } = useParams();
    const itemsCollectionRef = collection(db, "items");
    const [ itemList, setItemList ] = useState([]);

    useEffect(() => {
        const getItemList = async () => {
            const data = await getDocs(itemsCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setItemList(filteredData);
        }

        getItemList();
    }, [])

    return (
        <div>
            <h1>Pagina Productos</h1>

            <div className="galeria">
                {itemList.map((producto) => {
                    if (!category || category == producto.category) {
                        return (
                            <article key={producto.id}>
                                <h5>{producto.title} ({producto.quantity} unidades)</h5>
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