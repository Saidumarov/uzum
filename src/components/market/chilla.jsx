import React, { useState } from "react";
import "../../styles/chilla.css";
import Next from "../../constants";
const Chilla = () => {
  const [state, setState] = useState();

  return (
    <div>
      <h2 className="bb">
        Chilla Bozor
        <span style={{ paddingTop: "10px" }}>
          <Next />
        </span>
      </h2>
      <div className="mobilchil">
        <p className="mobc" onClick={() => setState(`8%`)}>
          Chilla Bozor
        </p>
        <p className="mobc" onClick={() => setState(`41%`)}>
          Mashhur
        </p>
        <p className="mobc" onClick={() => setState(`70%`)}>
          Yangi
        </p>
        <div className="scle" style={{ left: state }}></div>
      </div>
    </div>
  );
};

export default Chilla;
