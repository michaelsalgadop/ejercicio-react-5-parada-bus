import React from "react";
import { ClipLoader } from "react-spinners";
export const Loading = React.memo((props) => {
  const { infoShowLoading } = props;
  return (
    <div className="loading-container">
      <span className="loader">
        <p className="text-center">{infoShowLoading}</p>
        <p className="text-center d-flex justify-content-center align-items-center">
          Porfavor espere...&nbsp;
          <ClipLoader size={20}></ClipLoader>
        </p>
      </span>
    </div>
  );
});
