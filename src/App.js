/*global chrome*/
import React, { Component } from "react";
import logo from "./logo.svg";
import TestComponent from "./TestComponent.js";
import UrlItems from "./UrlItems.js";
import CodeComponent from "./CodeComponent.js";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [alltabs, setAllTabs] = useState([]);
  const [allCode, setAllCode] = useState("");
  const [showComponent, setShowComponent] = useState(true);

  function getTabs() {
    var tabState = {};
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        for (var i = 0; i < tabs.length; i++) {
          var tab = tabs[i];
          tabState[tab.id] = tab.title;
        }
        setAllTabs(tabs);
        sortByState(tabs, -1, tabState);
        moveTabs(tabs);
      }
    });
  }

  getTabs();

  function sortByState(tabs, reverse, state) {
    tabs.sort(function (a, b) {
      var keyA = state[a.id],
        keyB = state[b.id];
      if (keyA < keyB) return reverse * 1;
      if (keyA > keyB) return reverse * -1;
      return 0;
    });
  }

  function moveTabs(tabs) {
    for (var i = 0; i < tabs.length; ++i) {
      // Current tab is pinned, so decrement the tabIndex by one.
      chrome.tabs.move(tabs[i].id, {
        index: i,
      });
    }
  }

  function getCode(tabid) {
    // chrome.tabs.update(tabid, {
    //   active: true,
    // });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabid, { method: "getText" }, function (
        response
      ) {
        if (response.method == "getText") {
          setAllCode(response.data);
          console.log(response.data);
        }
      });
    });
  }

  function switchComponent() {
    setShowComponent(!showComponent);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Test first react app</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </header> */}
      <div>{/* <button onClick={() => handleClick()}>click</button> */}</div>
      <div>
        <button className="showbutton" onClick={() => switchComponent()}>
          {showComponent ? "Show Text" : "Show Tabs"}
        </button>
      </div>
      <div>
        {showComponent ? (
          <TestComponent getCodes={getCode} thetabs={alltabs} />
        ) : (
          <CodeComponent text={allCode} />
        )}
      </div>
      {/* <div>
        <TestComponent getCodes={getCode} thetabs={alltabs} />
      </div>
      <div><CodeComponent text={allCode}/></div> */}
    </div>
  );
}

export default App;
