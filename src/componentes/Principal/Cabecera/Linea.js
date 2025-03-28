import { useNavigate } from "react-router-dom";

export const Linea = (props) => {
  const { tipo, linea, destino, tiempo, tamanyo, referencia } = props;
  const navigate = useNavigate();
  const navegarPaginaInformacionLinea = () => navigate(`/linea/${linea}`);
  return (
    <div
      className={`${tipo}`}
      style={{ top: tamanyo + "px" }}
      ref={referencia}
      onClick={navegarPaginaInformacionLinea}
    >
      <span className="linea">{linea}</span>
      <span className="destino">{destino}</span>
      <span className="tiempo">{tiempo}</span>
    </div>
  );
};
