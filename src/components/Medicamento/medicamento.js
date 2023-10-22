import React from "react";
import '../../App.css';
const Medicamento = ({ name, price }) => {
    return (
        <div className="fila-detalles-medicamento">
            <div className="medicamentos">{name}</div>
            <div> <strong>${price}</strong></div>
        </div>
    )
}

export default Medicamento;