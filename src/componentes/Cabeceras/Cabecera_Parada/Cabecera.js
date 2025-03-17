import { Display } from "./Display";
import { NumeroParada } from "./NumeroParada";
import { TiempoLinea } from "./TiempoLinea";

export const Cabecera = () => {
  return (
    <header className="cabecera">
      <NumeroParada></NumeroParada>
      <Display></Display>
      <TiempoLinea></TiempoLinea>
    </header>
  );
};
