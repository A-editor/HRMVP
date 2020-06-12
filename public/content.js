/* global chrome */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // var findElements = function () {
  //   var elements = document.body.innerHTML;
  //   var found = [];
  //   for (var i = 0; i < elements.length; i++) {
  //     if (elements[i]) {
  //       found.push(elements[i]);
  //     }
  //   }
  //   return found;
  // };
  if (request.method == "getText") {
    sendResponse({
      //   data: document.body.innerText,
      data: document.body.innerHTML,
      method: "getText",
    });
  }
});
