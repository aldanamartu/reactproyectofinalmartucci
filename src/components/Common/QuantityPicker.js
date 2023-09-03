import { useState } from 'react';

const QuantityPicker = ({quantity}) => {
    console.log("cantidad: " + quantity);
    const [count, setCount] = useState(1);

    return (
        <div>
            <button onClick={() => count > 1 ? setCount(count - 1) : console.log("no se puede ordenar menos de 1 unidad")}>-</button>
                Cantidad: <span id="quantitySelected">{count}</span>
            <button onClick={() => count < quantity ? setCount(count + 1) : console.log("no se puede ordenar mas de %i unidades", quantity)}>+</button>
            
        </div>
    )
}

export default QuantityPicker