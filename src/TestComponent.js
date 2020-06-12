import React from "react";
import { useEffect, useState } from "react";
import UrlItems from "./UrlItems.js";

const TestComponent = (props) => {
  //   const [showTabs, setShowTabs] = useState(false);

  const listItems = props.thetabs.map((tab) =>
    tab.url.includes("www")
      ? tab.url.substring(tab.url.indexOf(".") + 1, tab.url.lastIndexOf("."))
      : tab.url.substring(8, tab.url.indexOf("."))
  );
  const finalListItems = Array.from(new Set(listItems));
  return (
    <div>
      <div>
        {finalListItems.map((item) => (
          <div>
            {/* <div>{item}</div> */}
            <div>
              <UrlItems
                getCodes={props.getCodes}
                base={item}
                list={props.thetabs}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestComponent;
