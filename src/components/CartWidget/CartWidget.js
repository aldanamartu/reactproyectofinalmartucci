import img from './assets/carrito.png';

let carrito = localStorage.getItem("carrito");

const CartWidget = () => {
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


    return (
        <div>
            <img src={img} style={{ width: '30px', height: '30px' }} alt='imagen carrito'></img>
            { carrito.length }
        </div>
        
    )
}

export default CartWidget