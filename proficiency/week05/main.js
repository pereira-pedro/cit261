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
var localDB = null;
var remoteCurrentEmployee = 0;
var localCurrentEmployee = 0;

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

function loadLocalDB() {
  localDB = JSON.parse(
    '{ "employees" : [' +
      '{ "firstName":"John" , "lastName":"Doe" },' +
      '{ "firstName":"Anna" , "lastName":"Smith" },' +
      '{ "firstName":"Peter" , "lastName":"Jones" } ]}'
  );

  localCurrentEmployee = 0;
  showEmployee(localDB, localCurrentEmployee);
  localCurrentEmployee++;
}

document.getElementById("nextLocal").addEventListener(
  "click",
  function() {
    showEmployee(localDB, localCurrentEmployee);

    localCurrentEmployee++;
    if (localCurrentEmployee >= localDB.employees.length) {
      localCurrentEmployee = 0;
    }
  },
  false
);

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

document.getElementById("loadLocal").addEventListener(
  "click",
  function() {
    loadLocalDB();
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
