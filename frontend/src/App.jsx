import { useState } from "react";

function App() {
  // Estados
  const [saldo, setSaldo] = useState(100000);
  const [movimientos, setMovimientos] = useState([]);

  // Estados del formulario
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("");

  // Variable auxiliar
  const numero = Number(valor);

  // Manejo de los campos
  function cambiarValor(e) {
    setValor(e.target.value);
  }

  function cambiarDescripcion(e) {
    setDescripcion(e.target.value);
  }

  function cambiarTipo(e) {
    setTipo(e.target.value);
  }

  // Guardar movimiento
  function guardarMovimiento() {
    const movimiento = {
      descripcion,
      valor: numero,
      tipo,
    };

    setMovimientos([...movimientos, movimiento]);

    // Limpiar formulario
    setDescripcion("");
    setValor("");
    setTipo("");
  }

  return (
    <div>
      <h1>Control de gastos</h1>

      <p>Saldo: {saldo}</p>

      <p>
        Descripción
        <input type="text" value={descripcion} onChange={cambiarDescripcion} />
      </p>

      <p>
        Valor
        <input type="number" value={valor} onChange={cambiarValor} />
      </p>

      <p>
        Tipo
        <select value={tipo} onChange={cambiarTipo}>
          <option value="">Seleccione...</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
      </p>

      <button onClick={guardarMovimiento}>Guardar movimiento</button>

      <hr />

      <h2>Movimientos</h2>

      {movimientos.map((movimiento, index) => (
        <p key={index}>
          {movimiento.descripcion} - ${movimiento.valor} - {movimiento.tipo}
        </p>
      ))}
    </div>
  );
}

export default App;
