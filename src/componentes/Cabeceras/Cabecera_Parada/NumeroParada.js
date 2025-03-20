import React, { useContext } from "react";
import { ParadasContext } from "../../../contexts/ParadasContext";

export const NumeroParada = React.memo((props) => {
  const { datosAPI } = props;
  const { parada } = useContext(ParadasContext);
  return datosAPI.data?.ibus?.length > 0 ? (
    <h1>Parada nº {parada}</h1>
  ) : datosAPI?.data?.ibus?.length === 0 && parada ? (
    <h1>No existe la parada {parada}</h1>
  ) : (
    <h1>Introduce una parada</h1>
  );
});
