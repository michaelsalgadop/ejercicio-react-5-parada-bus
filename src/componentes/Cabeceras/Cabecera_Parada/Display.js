import { Linea } from "./Linea";

export const Display = () => {
  return (
    <div className="display">
      <Linea
        tipo="bus"
        linea={"V16"}
        destino={"Universitat"}
        tiempo={"10min"}
      ></Linea>
      <Linea
        tipo="bus"
        linea={"H12"}
        destino={"Pla de Palau"}
        tiempo={"1min"}
      ></Linea>
      <Linea
        tipo="bus"
        linea={"32"}
        destino={"Barceloneta"}
        tiempo={"4min"}
      ></Linea>
    </div>
  );
};
