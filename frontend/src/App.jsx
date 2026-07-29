import { useState } from "react";

function App() {
  const [saldo, setSaldo] = useState(100000);
  const [valor, setValor] = useState("");
  const numero = Number(valor);

  function agregar() {
    if (numero <= 0 ) {
      alert("Debe ingresar primero un valor a agregar distinto a 0");
    }
    else {
      setSaldo(saldo + numero);
      setValor("");
    }
  }

  function retirar() {
    if (numero <= 0) {
      alert("Debe ingresar primero un valor a agregar distinto a 0");
    }  else if(numero > saldo){
      alert ("No puede retirar más dinero del que tiene")
    } else {
      setSaldo(saldo - numero);
      setValor("");
    }
  }

  function cambiar(e) {
    setValor(e.target.value);
  }

  return (
    <div>
      <h1>hola</h1>
      <p>Saldo {saldo}</p>
      <input type="number" value={valor} onChange={cambiar} />
      <button onClick={agregar}>Agregar</button>
      <button onClick={retirar}>Retirar</button>
    </div>
  );
}

export default App;
