export const Linea = (props) => {
  const { tipo, linea, destino, tiempo, tamanyo, referencia } = props;
  return (
    <div className={`${tipo}`} style={{ top: tamanyo + "px" }} ref={referencia}>
      <span className="linea">{linea}</span>
      <span className="destino">{destino}</span>
      <span className="tiempo">{tiempo}</span>
    </div>
  );
};
