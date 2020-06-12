/*global chrome*/
import React from "react";
import { useEffect, useState } from "react";

const UrlItems = (props) => {
  const [allCode, setAllCode] = useState("");
  const [showTab, setShowTab] = useState(false);
  function selectTab(tabid, window_Id) {
    chrome.tabs.update(tabid, {
      active: true,
      highlighted: true,
    });
    chrome.windows.update(window_Id, {
      focused: true,
    });
  }

  function handleClick(tabid) {
    props.getCodes(tabid);
  }

  if (showTab) {
    var listItem = props.list.map((item) =>
      item.url.includes(props.base) ? (
        <div className="tabblock">
          <img src={item.favIconUrl}></img>
          <button onClick={() => selectTab(item.id, item.windowId)}>
            {item.title}
          </button>
          <button onClick={() => handleClick(item.id)}>Get Text</button>
        </div>
      ) : (
        <div></div>
      )
    );
  } else {
    listItem = <div></div>;
  }
  // function getCode(tabid) {
  //   // chrome.tabs.update(tabid, {
  //   //   active: true,
  //   // });
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     chrome.tabs.sendMessage(tabid, { method: "getText" }, function (
  //       response
  //     ) {
  //       if (response.method == "getText") {
  //         setAllCode(response.data);
  //         console.log(response.data);
  //       }
  //     });
  //   });
  // }
  if (props.base === "youtube") {
    var bcolor = "red";
  } else if (props.base === "stackoverflow") {
    bcolor = "brown";
  } else if (props.base === "medium") {
    bcolor = "black";
  } else {
    bcolor = "black";
  }

  return (
    <div>
      <button
        style={{
          backgroundColor: bcolor,
          color: "white",
          width: "100%",
          height: "2.5rem",
        }}
        onClick={() => setShowTab(!showTab)}
      >
        {props.base.toUpperCase()}
      </button>
      <div>
        {listItem}
        {/* {props.list.map((item) =>
          item.url.includes(props.base) ? (
            <div>
              <img src={item.favIconUrl}></img>
              <button onClick={() => selectTab(item.id, item.windowId)}>
                {item.title}
              </button>
              <button onClick={() => handleClick(item.id)}>Get Code</button>
            </div>
          ) : (
            <div></div>
          )
        )} */}
      </div>
    </div>
  );
};

export default UrlItems;
