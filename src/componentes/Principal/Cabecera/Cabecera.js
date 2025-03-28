import { useContext } from "react";
import { Display } from "./Display";
import { NumeroParada } from "./NumeroParada";
import { TiempoLinea } from "./TiempoLinea";
import { ParadasContext } from "../../../contexts/ParadasContext";

export const Cabecera = (props) => {
  const { datosAPI, comprobacionDatosAPI, minutosTiempoLinea } = props;
  const { linea } = useContext(ParadasContext);
  return (
    <header className="cabecera">
      <NumeroParada
        datosAPI={datosAPI}
        comprobacionDatosAPI={comprobacionDatosAPI}
      ></NumeroParada>
      <Display
        datosAPI={datosAPI}
        comprobacionDatosAPI={comprobacionDatosAPI}
      ></Display>
      {linea && (
        <TiempoLinea minutosTiempoLinea={minutosTiempoLinea}></TiempoLinea>
      )}
    </header>
  );
};
