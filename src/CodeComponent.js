import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

const CodeComponent = (props) => {
  //   const newcode = props.text.split("<code>");
  return (
    <div className="codecomponent">
      {/* <h4>{props.text}</h4> */}
      <h4 dangerouslySetInnerHTML={{ __html: props.text }}></h4>
      {/* <img src={props.text}></img> */}
    </div>
  );
};

export default CodeComponent;
