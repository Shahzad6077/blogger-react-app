import React from "react";
import img from "../assets/waitingBg.gif";
import brandLogo from "../assets/header-logo.svg";
import companyLogo from "../assets/company-logo.png";
const style = {
  paddingTop: "120px",
  paddingBottom: "120px",
  width: "100wh",
  height: "100vh",
  background: "white",
  display: "flex",
  flexFlow: "column",
  justifyContent: "space-around",
  alignItems: "center"
};

const WaitingPage = () => {
  return (
    <div style={style}>
      <img
        src={brandLogo}
        alt="Logo"
        style={{ width: "130px", height: "auto" }}
      />
      <img className="waitingPageImage" src={img} alt="Loading..." />
      <h5>
        POWERED BY{" "}
        <img
          src={companyLogo}
          alt="Logo"
          style={{ width: "180px", height: "auto" }}
        />
      </h5>
    </div>
  );
};

export default WaitingPage;
