import React from "react";
import { BeatLoader } from "react-spinners";

const Loader: React.FC = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        margin: "0 auto",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        zIndex: 200,
        backgroundColor: "rgba(0, 0, 0, .6)",
      }}
    >
      <BeatLoader loading={true} color={"#ddd"} size={15} margin={3} />
    </div>
  );
};

export default Loader;
