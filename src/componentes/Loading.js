import React from "react";
import { ClipLoader } from "react-spinners";
export const Loading = React.memo(() => {
  return (
    <div className="loading-container">
      <span className="loader">
        Cargando...&nbsp;<ClipLoader size={30}></ClipLoader>
      </span>
    </div>
  );
});
