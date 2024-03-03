function createTable(data, universityJSON) {
  const tableDiv = document.getElementById("projectionAllocate");
  const table = document.createElement("table");
  const headerRow = table.insertRow();

  // Adding headers
  for (let key in data[0]) {
    if (key === "id") {
      continue;
    }
    const th = document.createElement("th");

    if (key.toUpperCase() == "UNIVERSITYID") {
      th.textContent = "UNIVERSITY";
    } else {
      th.textContent = key.toUpperCase();
    }

    headerRow.appendChild(th);
  }

  // Adding data rows
  data.forEach((item) => {
    const row = table.insertRow();
    for (let key in item) {
      if (key === "id") {
        continue;
      }
      const cell = row.insertCell();
      if (key.toUpperCase() === "DATEALLOCATED") {
        cell.textContent = item[key].split("T")[0];
      } else if (key.toUpperCase() == "UNIVERSITYID") {
        cell.textContent = getUniversityByID(item[key], universityJSON);
      } else if (key.toUpperCase() == "BUDGET") {
        cell.textContent = item[key].toLocaleString("en-US", {
          style: "currency",
          currency: "ZAR",
        });
      } else {
        cell.textContent = item[key];
      }
    }
  });

  tableDiv.innerHTML = "";

  const preText = document.createElement("p");
  preText.setAttribute("id", "preText");
  preText.innerHTML =
    " Below is how the budget will be split according to the accepted universities, if you wish to allocate a different amount to a certain university,<br /> Navigate to the allocate a university tab in the side bar. <br /><br />";

  tableDiv.appendChild(preText);

  tableDiv.appendChild(table);
}
function getUniversityByID(id, universityJSON = Array) {
  universityData = {};

  for (i = 0; i < universityJSON.length; i++) {
    if (universityJSON[i]["id"] === id) {
      universityData = universityJSON[i];
    }
  }
  return universityData["name"];
}

document
  .getElementById("populateFundsButton")
  .addEventListener("click", async () => {
    jsonData = await fetchData(
      "http://localhost:5263/api/Admin/AllocateProjection",
      "GET"
    );
    universityJSON = await fetchData(
      " http://localhost:5263/api/Admin/GetAllUniversities",
      "GET"
    );

    document.getElementById("projectionAllocate").style.display = "flex";
    createTable(jsonData, universityJSON);
    const confirmButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    confirmButton.setAttribute("class", "populateFundsButton");
    confirmButton.setAttribute("id", "confirmAllocateButton");
    cancelButton.setAttribute("class", "populateFundsButtonC");
    cancelButton.setAttribute("id", "cancelAllocateButton");
    document.getElementById("projectionAllocate").appendChild(confirmButton);
    document.getElementById("projectionAllocate").appendChild(cancelButton);
    confirmButton.textContent = "CONFIRM";
    cancelButton.textContent = "CANCEL";
    document
      .getElementById("cancelAllocateButton")
      .addEventListener("click", () => {
        document.getElementById("projectionAllocate").style.display = "none";
      });

    document
      .getElementById("confirmAllocateButton")
      .addEventListener("click", () => {
        document.getElementById("projectionAllocate").style.display = "none";
      });
  });
