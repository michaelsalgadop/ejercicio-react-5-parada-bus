import { useFormulario } from "../hooks/useFormulario";

export const FormularioParada = (props) => {
  const { buscarParada } = props;
  const { setData, datosFormulario } = useFormulario(0);
  const checkearParada = (e) => {
    e.preventDefault();
    if (!datosFormulario) return;
    buscarParada(datosFormulario);
  };
  return (
    <form onSubmit={checkearParada}>
      <label htmlFor="num-parada">Parada nº: </label>
      <input
        type="number"
        min={0}
        id="num-parada"
        value={datosFormulario ? datosFormulario : 0}
        onChange={setData}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};
