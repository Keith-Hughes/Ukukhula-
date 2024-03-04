async function StartFill() {
  let universitiesDict = {};
  const universitiesObject = await fetch(
    config.apiUrl + "Admin/GetAllUniversities",
    createOptions("GET", {})
  );
  const universities = await universitiesObject.json();

  for (let i = 0; i < universities.length; i++) {
    universitiesDict[universities[i]["id"]] = universities[i]["name"];
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  const universityRequests = fetchUnivesities();

  let universityFilter = document.getElementById("universityFilter");
  populateDropdown(universityFilter, Object.values(universitiesDict));

  document.getElementById("Fund-form").addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      showLoadingScreen();
      const budget = document.getElementById("Budget").value;
      const universityID = getKeyByValue(
        universitiesDict,
        universityFilter.value
      );

      const universityRequests = await fetchUnivesities();

      let requestID = 0;
      console.log(universityRequests.length);
      for (let i = 0; i < universityRequests.length; i++) {
        if (
          universityRequests[i]["university"] === universitiesDict[universityID]
        ) {
          requestID = universityRequests[i]["requestID"];
        }
      }
      let result = {};
      if (requestID == 0) {
        console.log("could not find request for this university");
      } else {
        result = await fetchData(
          `http://localhost:5263/api/Admin/allocateUniversityBudget?URequestID=${requestID}&AmountAllocated=${budget}`,
          "POST",
          {}
        );
      }
      closeLoadingScreen();

      if (result == 4) {
        document.getElementById("ResponseText").style.color = "green";
        document.getElementById("ResponseText").innerHTML =
          "YOU HAVE SUCCESSFULLY FUNDED THE UNIVERSITY";
      } else {
        document.getElementById("ResponseText").style.color = "red";
        document.getElementById("ResponseText").innerHTML =
          "SYSTEM ENCOUNTERED AN ERROR WHILE ALLOCATING TO THIS UNIVERSITY";
      }
    } catch (Ex) {
      console.log(Ex);
    }
  });
}
async function fetchUnivesities() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    config.apiUrl + "Admin/GetAllUniversityRequests",
    options
  );
  return await response.json();
}

function populateDropdown(selectElement, values) {
  values.forEach(function (value) {
    let option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
}

function getUniqueColumnValues(table, columnIndex) {
  let values = [];
  let rows = table.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    let cellValue = row.cells[columnIndex].textContent;
    if (!values.includes(cellValue)) {
      values.push(cellValue);
    }
  }
  return values;
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
StartFill();
