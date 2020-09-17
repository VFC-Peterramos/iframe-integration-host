document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.querySelector("#iframe-test");
  const eventButton = document.querySelector("#trigger-event-btn");
  window.addEventListener("message", (event) => {
    console.log(event);
  });
  eventButton.addEventListener("click", () => {
    iframe.contentWindow.postMessage("hello world", "http://localhost:3000");
  });
  console.log("hello world!");
  console.log(iframe.getAttribute("src"));
  console.log(iframe);
});
