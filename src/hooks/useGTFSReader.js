import Papa from "papaparse";
export const useGTFSReader = () => {
  const getDataGTFSReader = async (archivo) => {
    try {
      const response = await fetch(`/gtfs/${archivo}`);

      if (!response.ok) {
        throw new Error("No se ha devuelto la información deseada");
      }

      const text = await response.text();
      // Esperar el resultado antes de devolverlo, lo envolvemos en una promesa, ya que Papa.parse es SINCRONO.
      return new Promise((resolve) => {
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            resolve(result.data);
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
