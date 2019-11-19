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

function draw(canvas, points) {
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.color = '#ff0000';
  var pastRow = null;
  const rect = canvas.getBoundingClientRect();

  points.forEach(function (row) {
    console.log(JSON.stringify(row));
    if (pastRow !== null) {
      ctx.moveTo(pastRow.x - rect.left, pastRow.y - rect.top);
      ctx.lineTo(row.x - rect.left, row.y - rect.top);
      ctx.stroke();
    }

    pastRow = { identifier: row.identifier, x: row.x, y: row.y };


  });
}
