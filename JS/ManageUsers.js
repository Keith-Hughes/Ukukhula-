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
    config.apiUrl + "Admin/GetUniversityUsers",
    options
  );
  const dataResponse = await response.json();
  // globalResponseData = dataResponse;

  const display = document.getElementById("UsersSection");
  console.log(dataResponse);
  const table = document.createElement("table");
  table.setAttribute("id", "UsersTable");

  const headerRow = document.createElement("tr");

  const keys = [
    "id",
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
    "ACTION",
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
      if (!key.includes("id")) {
        const cell = document.createElement("td");
        cell.textContent = obj[key];
        if (key === "status") {
          // Set color based on status value
          if (obj["status"].toUpperCase().includes("INACTIVE")) {
            cell.style.color = "red";
          } else {
            cell.style.color = "green";
          }
        }
        row.appendChild(cell);
      }
    });

    table.appendChild(row);
    const actionCell = document.createElement("td");
    const viewButton = document.createElement("button");
    console.log(typeof obj["status"]);

    if (obj["status"].toUpperCase().includes("INACTIVE")) {
      viewButton.textContent = "ACTIVATE";
    } else {
      viewButton.textContent = "DEACTIVATE";
    }

    viewButton.addEventListener("click", function (event) {
      event.preventDefault();
      showDeactivate(obj, viewButton);
    });
    viewButton.setAttribute("class", "ActivateButton");
    actionCell.appendChild(viewButton);
    row.appendChild(actionCell);
  });

  display.appendChild(table);
  return dataResponse;
}

function showAdmin() {
  loadScripts(["../JS/NewAdmin.js"]);
  document.getElementById("NewAdmin").style.display = "flex";
  document.getElementById("NewAdmin").style.flexDirection = "column";
}
function showDeactivate(obj, viewButton) {
  document.getElementById("userDeactivate").style.display = "flex";
  document.getElementById("userDeactivateButtonConfirm").style.display = "flex";
  data =
    "You are about to " +
    viewButton.textContent +
    " " +
    obj["firstName"] +
    " " +
    obj["lastName"] +
    " A HOD FROM " +
    obj["universityName"];
  document.getElementById("userDeactivateText").innerHTML = data;
  document
    .getElementById("userDeactivateButtonCancel")
    .addEventListener("click", () => {
      document.getElementById("userDeactivate").style.display = "none";
    });

  document
    .getElementById("userDeactivateButtonConfirm")
    .addEventListener("click", async () => {
      userID = obj["id"];

      Status = viewButton.textContent == "DEACTIVATE" ? "INACTIVE" : "ACTIVE";
      document.getElementById("userDeactivateButtonConfirm").style.display =
        "none";
      responseData = await fetchData(
        config.apiUrl +
          `Admin/updateUserActivity?UserID=${userID}&Status=${Status}`,
        "PUT"
      );
      console.log(responseData);

      document.getElementById("userDeactivateResponseText").style.color =
        "green";
      document.getElementById("userDeactivateResponseText").innerHTML =
        responseData["message"];
      document.getElementById("userDeactivateText").innerHTML = "";
    });
}

function showHOD() {
  loadScripts(["../JS/NewHOD.js"]);
  document.getElementById("NewHOD").style.display = "flex";
  document.getElementById("NewHOD").style.flexDirection = "column";
}

function closePopup(form) {
  document.getElementById("responseMessageHOD").innerHTML = "";
  document.getElementById("responseMessageAdmin").innerHTML = "";
  removeScript(["../JS/" + form + ".js"]);

  document.getElementById(form).style.display = "none";
}
