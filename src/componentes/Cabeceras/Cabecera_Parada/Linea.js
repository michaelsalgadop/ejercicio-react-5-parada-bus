export const Linea = (props) => {
  const { tipo, linea, destino, tiempo } = props;
  return (
    <div className={`${tipo}`}>
      <span className="linea">{linea}</span>
      <span className="destino">{destino}</span>
      <span className="tiempo">{tiempo}</span>
    </div>
  );
};
