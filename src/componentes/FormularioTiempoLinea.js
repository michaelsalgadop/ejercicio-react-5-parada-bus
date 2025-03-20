export const FormularioTiempoLinea = (props) => {
  const { datosAPI, setLinea } = props;
  const setearLinea = (e) => {
    const linea = e.target.value;
    if (linea) setLinea(linea);
  };
  return (
    <form>
      <label htmlFor="tiempo-linea">Tiempo para que llegue la línea: </label>
      <select id="tiempo-linea" onChange={setearLinea}>
        <option value="">Elige línea</option>
        {datosAPI.status &&
          datosAPI.status === "success" &&
          datosAPI.data.ibus.map(({ line: lineaBus, routeId }) => (
            <option key={routeId} value={lineaBus}>
              {lineaBus}
            </option>
          ))}
      </select>
    </form>
  );
};
