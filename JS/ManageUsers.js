function loadScripts(scriptPaths) {
  scriptPaths.forEach(function (scriptPath) {
    var script = document.createElement("script");
    script.src = scriptPath;
    // script.type = "text/javascript";
    document.body.appendChild(script);
  });
}
function removeScript(scriptPath) {
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src === scriptPath) {
      scripts[i].parentNode.removeChild(scripts[i]);
      break;
    }
  }
}
function createOptions(methodName, bodyMessage) {
  if (methodName === "POST") {
    return {
      method: methodName,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(bodyMessage),
    };
  } else {
    return {
      method: methodName,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
  }
}

GetAllRequests();

async function GetAllRequests() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  const response = await fetch(
    "http://localhost:5263/api/Admin/GetUniversityUsers",
    options
  );
  const dataResponse = await response.json();
  // globalResponseData = dataResponse;

  const display = document.getElementById("UsersSection");

  const table = document.createElement("table");
  table.setAttribute("id", "UsersTable");

  const headerRow = document.createElement("tr");

  const keys = [
    "universityName",
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "status",
  ];

  const columnHeadings = [
    "UNIVERSITY",
    "NAME",
    "SURNAME",
    "PHONE NUMBER",
    "EMAIL",
    "STATUS",
  ];

  columnHeadings.forEach((eachHeading) => {
    const th = document.createElement("th");
    th.textContent = eachHeading;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  dataResponse.forEach((obj) => {
    const row = document.createElement("tr");
    keys.forEach((key) => {
      const cell = document.createElement("td");

      cell.textContent = obj[key];
      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  display.appendChild(table);
  return dataResponse;
}

function showAdmin() {
  loadScripts(["../../JS/NewAdmin.js"]);
  document.getElementById("NewAdmin").style.display = "flex";
  document.getElementById("NewAdmin").style.flexDirection = "column";
}

function showHOD() {
  loadScripts(["../../JS/NewHOD.js"]);
  document.getElementById("NewHOD").style.display = "flex";
  document.getElementById("NewHOD").style.flexDirection = "column";
}

function closePopup(form) {
  document.getElementById("responseMessageHOD").innerHTML = "";
  document.getElementById("responseMessageAdmin").innerHTML = "";
  removeScript(["../../JS/" + form + ".js"]);

  document.getElementById(form).style.display = "none";
}
