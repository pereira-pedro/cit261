window.onload = function () {
  const buttons = document.getElementsByClassName("topic-button");

  for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function (e) {
      const ev = e || window.event;
      const target = ev.target || ev.srcElement;
      executeCode(target);
    };
  }
};

function executeCode(topic) {
  const id = topic.getAttribute("data-id");

  const code = document.getElementById(`topic-${id}-code`);
  const console = document.getElementById(`topic-${id}-console`);

  console.innerHTML = eval(code.innerText);
  console.style.visibility = "visible";
}
