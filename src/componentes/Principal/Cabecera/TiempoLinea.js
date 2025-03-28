import { useContext } from "react";
import { ParadasContext } from "../../../contexts/ParadasContext";

export const TiempoLinea = (props) => {
  const { minutosTiempoLinea } = props;
  const { linea } = useContext(ParadasContext);
  return (
    <h2>
      Tiempo para la línea {linea}: {minutosTiempoLinea} minutos
    </h2>
  );
};
