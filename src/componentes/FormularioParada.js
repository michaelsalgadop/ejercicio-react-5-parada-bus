export const FormularioParada = () => {
  return (
    <form>
      <label htmlFor="num-parada">Parada nº: </label>
      <input type="number" id="num-parada" />
      <button type="submit">Buscar</button>
    </form>
  );
};
