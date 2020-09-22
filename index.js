function handleOpen() {
  const newIframe = document.createElement("iframe");
  // const openBtnContainer = document.querySelector("#js-open-btn-container");
  const openBtn = document.querySelector("#open");

  newIframe.setAttribute(
    "src",
    "https://vfc-peterramos.github.io/iframe-demo-integration/"
  );
  newIframe.setAttribute("height", "600px");
  newIframe.setAttribute("width", "800px");
  newIframe.setAttribute("frameborder", "0");
  newIframe.setAttribute("id", "iframe-test");
  newIframe.setAttribute("title", "important for accessibility");
  document.body.appendChild(newIframe);

  openBtn.parentNode.removeChild(openBtn);
}
document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.querySelector("#iframe-test");
  const eventButton = document.querySelector("#trigger-event-btn");
  const iframeSrc = iframe.getAttribute("src");
  const openButton = `<button onclick=handleOpen() style="display: block" id="open">Open iframe</button>`;
  const openBtnContainer = document.querySelector("#js-open-btn-container");

  window.addEventListener("message", (event) => {
    // Check to see if Message event is coming from a trusted cross-origin source
    console.log("event.path.location.href ===", event.path.location.href);
    console.log("iframeSrc ===", iframeSrc);

    if (event.path.location.href !== iframeSrc) {
      console.error(
        "Blocking this event as it is coming from an untrusted cross-origin source."
      );
    }
    if (event.data === "close") {
      // We have recieved a command to close the iframe from within the iframe
      console.log("we recieved a close iframe event");

      /**
       *  If this were evet - they could send along information to some
       *  audit API or CC to relay to one of our services
       *  on the gpm side telling us when the flow was abondoned
       */
      const frameToClose = document.querySelector("#iframe-test");

      frameToClose.parentNode.removeChild(frameToClose);

      openBtnContainer.innerHTML = openButton;
    }
    // alert("an event was received from the embedded app!");
    console.log("event coming from iframe is ===", event);
  });

  eventButton.addEventListener("click", () => {
    document.querySelector("#iframe-test").contentWindow.postMessage(
      {
        testNum: 1,
        testFloat: 1.00238,
        testString: "hello world",
        testJson: JSON.stringify({
          one: 1,
          two: "2",
          three: false,
          four: true,
        }),
        testArray: ["I", 8, "garlic"],
        testObject: {
          objectKey1: "string",
          objectKey2: false,
        },
      },
      "https://vfc-peterramos.github.io/iframe-demo-integration/"
    );
  });
});
