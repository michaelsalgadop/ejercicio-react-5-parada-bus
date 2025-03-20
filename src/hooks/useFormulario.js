import { useState } from "react";
export const useFormulario = (datosElementosFormulario) => {
  const [datosFormulario, setDatosFormulario] = useState(
    datosElementosFormulario
  );
  const setData = (e) => {
    const elemento = e.target;
    setDatosFormulario(elemento.valueAsNumber);
  };

  return {
    setData,
    datosFormulario,
  };
};
