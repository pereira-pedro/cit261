window.onload = function() {
  const buttons = document.getElementsByClassName("topic-button");

  for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function(e) {
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

var remoteDB = null;
var remoteCurrentEmployee = 0;

function showEmployee(db, currentEmployee) {
  if (db === null) {
    alert("Database not initialized. Load it before usage.");
  }

  document.getElementById("employee").innerHTML =
    db.employees[currentEmployee].firstName +
    " " +
    db.employees[currentEmployee].lastName;

  document.getElementById("strjson").innerHTML =
    "All database: " +
    JSON.stringify(db) +
    "<br/>" +
    "Current employee: " +
    JSON.stringify(db.employees[currentEmployee]);
}

function loadRemoteDB() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      remoteDB = JSON.parse(this.responseText);
      remoteCurrentEmployee = 0;
      showEmployee(remoteDB, remoteCurrentEmployee);
      remoteCurrentEmployee++;
    }
  };
  xhttp.open(
    "GET",
    "https://raw.githubusercontent.com/pereira-pedro/cs261/master/week04/employee.json",
    true
  );
  xhttp.send();
}

function loadWeather() {
  const xhttp = new XMLHttpRequest();
  const uri = encodeURI(
    "http://api.weatherstack.com/current?access_key=69884e06e056d3e5f763b6f9875738b2&query=Campo Grande"
  );

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const container = document.getElementById("topic-1-console");
      const response = JSON.parse(this.responseText);
      var buffer = "";
      container.style.visibility = "visible";
      buffer += `City: ${response.location.name}, ${response.location.region}, ${response.location.country}\n`;
      buffer += `Temperature: ${response.current.temperature} C\n`;
      buffer += `Humidity: ${response.current.humidity} %\n`;

      container.innerHTML = buffer;
    }
  };
  xhttp.open("GET", uri, true);
  xhttp.send();
}

document.getElementById("nextRemote").addEventListener(
  "click",
  function() {
    showEmployee(remoteDB, remoteCurrentEmployee);

    remoteCurrentEmployee++;
    if (remoteCurrentEmployee >= remoteDB.employees.length) {
      remoteCurrentEmployee = 0;
    }
  },
  false
);

document.getElementById("loadRemote").addEventListener(
  "click",
  function() {
    loadRemoteDB();
  },
  false
);
