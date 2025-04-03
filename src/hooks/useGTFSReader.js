import Papa, { parse } from "papaparse";
export const useGTFSReader = () => {
  const getDataGTFSReader = async (archivo, key, value) => {
    try {
      const response = await fetch(`/gtfs/${archivo}`);

      if (!response.ok) {
        throw new Error("No se ha devuelto la información deseada");
      }

      const text = await response.text();
      // Esperar el resultado antes de devolverlo, lo envolvemos en una promesa, ya que Papa.parse es SINCRONO.
      return new Promise((resolve) => {
        let resultadoFinal = []; // Almacena solo los datos filtrados
        let resuelto = false; // Para evitar múltiples llamados a resolve
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          chunk: (result, parser) => {
            if (key && value) {
              if (!result || !result.data) {
                console.warn("Chunk recibido sin datos.");
                return;
              }

              const datosFiltrados = result.data.filter(
                (fila) => fila[key] === value
              );

              if (datosFiltrados.length > 0)
                resultadoFinal.push(...datosFiltrados);

              if (resultadoFinal.length > 0) {
                parser.abort(); // Abortar solo si encontramos datos suficientes
                if (!resuelto) {
                  resuelto = true;
                  resolve(resultadoFinal);
                }
              }
            } else {
              parser.abort();
            }
          },
          complete: (result) => {
            if (!resuelto) {
              resolve(key && value ? resultadoFinal : result.data);
            }
          },
        });
      });
    } catch (error) {
      console.error("Error cargando el archivo:", error.message);
      return [];
    }
  };

  return {
    getDataGTFSReader,
  };
};
