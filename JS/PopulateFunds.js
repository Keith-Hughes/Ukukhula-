function createOptions(methodName, bodyMessage) {
  bodyTemp = methodName === "POST" ? body : null;
  return {
    method: methodName,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    bodyTemp: bodyMessage,
  };
}
function createTable(data, universityJSON) {
  const tableDiv = document.getElementById("projectionAllocate");
  const table = document.createElement("table");
  const headerRow = table.insertRow();

  console.log(data[0]);

  if (
    (data.length == 1 && data[0]["budget"] === 1) ||
    (data.length == 1 && data[0]["budget"] === 0)
  ) {
    tableDiv.innerHTML = "";

    const preText = document.createElement("p");
    preText.setAttribute("id", "preText");
    preText.innerHTML =
      "There are pending universities, make sure that all universities have been responed to for this year.(press CANCEL to go back) <br /><br />";

    tableDiv.appendChild(preText);
  } else {
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
    showLoadingScreen();
    jsonData = await fetchData(
      config.apiUrl + "Admin/AllocateProjection",
      "GET"
    );
    universityJSON = await fetchData(
      config.apiUrl + "Admin/GetAllUniversities",
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
      .addEventListener("click", async () => {
        await fetchData(
          "http://localhost:5263/api/Admin/allocateBuget",
          "POST",
          {}
        );
        document.getElementById("ResponseText").style.color = "green";
        document.getElementById("ResponseText").innerHTML =
          "CONGRATULATIONS! you have allocated funds to all universities and have no more funds to disperse";
        document.getElementById("populateFundsButton").style.display = "none";
        document.getElementById("projectionAllocate").style.display = "none";
      });
    closeLoadingScreen();
  });
