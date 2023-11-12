import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import "./App.css";

function SyncLoaderr() {
  return (
    <div className="loader">
      <SyncLoader
        color="rgb(44, 184, 102)"
        loading="true"
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default SyncLoaderr;
