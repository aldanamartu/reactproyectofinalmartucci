import carrito from './assets/carrito.png';

const CartWidget = () => {
    return (
        <div>
            <img src={carrito} style={{ width: '30px', height: '30px' }} alt='imagen carrito'></img>
            0
        </div>
        
    )
}

export default CartWidget