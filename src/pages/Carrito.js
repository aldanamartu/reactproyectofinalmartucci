
import { Link } from "react-router-dom";
import { db } from "../components/Firebase/firebase"
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

let carrito = localStorage.getItem("carrito");
let precio = localStorage.getItem("precio");

function Carrito() {
    //const itemsCollectionRef = collection(db, "items");
    const [itemList, setItemList] = useState([]);
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

    var result = [];
    for (var i in carrito) {
        result.push(carrito[i].id);
    }

    const q = query(items, where("title", "in", result));

    useEffect(() => {
        const getItemList = async () => {
            const data = await getDocs(q);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            //console.log(filteredData);
            setItemList(filteredData);
        }

        getItemList();
    }, [])

    return (
        <div>
            <h1>Pagina Carrito</h1>

            <div className="galeria">
                {itemList.map((producto) => {

                    var cant = carrito.find(o => o.id === producto.title).cantidad;
                    return (
                        <article key={producto.id}>
                            <h5>{producto.title} ({cant} unidades)</h5>
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