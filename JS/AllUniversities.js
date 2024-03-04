getAllUniversity();
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
async function getAllUniversity() {
  showLoadingScreen();
  const response = await fetch(
    config.apiUrl + "Admin/GetAllUniversityRequests",
    createOptions("GET", {})
  );
  const dataResponse = await response.json();
  //   console.log(dataResponse);
  const display = document.getElementById("AllUniversities");

  const table = document.createElement("table");
  table.setAttribute("id", "AllUniversitiesTable");

  const headerRow = document.createElement("tr");

  const keys = [
    "UNIVERSITY",
    "AMOUNT",
    "STATUS",
    "DATE CREATED",
    "COMMENT",
    "PROVINCE",
  ];

  keys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  dataResponse.forEach((obj) => {
    const row = document.createElement("tr");
    keys.forEach((key) => {
      const cell = document.createElement("td");

      let content = "";
      if (key.toLowerCase() === "date created") {
        content = obj["dateCreated"].split("T")[0];
      } else if (key.toLowerCase() === "amount") {
        content = "R" + obj[key.toLowerCase()];
      } else if (key.toLowerCase() === "status") {
        content = obj[key.toLowerCase()];
        switch (content) {
          case "Approved":
            cell.style.color = "#04aa6d";
            break;
          case "Rejected":
            cell.style.color = "red";
            break;
          case "Review":
            cell.style.color = "orange";
            break;
        }
      } else {
        content = obj[key.toLowerCase()];
      }

      cell.textContent = content;

      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  display.appendChild(table);
  closeLoadingScreen();
  populateFilterOptions();
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

function populateFilterOptions() {
  let universityFilter = document.getElementById("FilterByUniversity");
  universityFilter.style.overflow = "scroll";
  let ProvinceFilter = document.getElementById("ProvinceFilter");

  let universityValues = getUniqueColumnValues(
    document.getElementById("AllUniversitiesTable"),
    0
  );

  let statusValues = getUniqueColumnValues(
    document.getElementById("AllUniversitiesTable"),
    5
  );

  populateDropdown(universityFilter, universityValues);
  populateDropdown(ProvinceFilter, statusValues);
}

// Helper function to populate a dropdown with options
function populateDropdown(selectElement, values) {
  values.forEach(function (value) {
    let option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
}
function filterTable() {
  // Get selected values from filters
  let universityFilter = document.getElementById("FilterByUniversity").value;
  let statusFilter = document.getElementById("ProvinceFilter").value;

  // Get the table and rows
  let table = document.getElementById("AllUniversitiesTable");
  let rows = table.getElementsByTagName("tr");

  // Loop through all table rows, hide those that don't match the filter criteria
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    let university = row.cells[0].textContent;
    let status = row.cells[5].textContent;

    let universityMatch =
      universityFilter === "" || university === universityFilter;
    let statusMatch = statusFilter === "" || status === statusFilter;

    if (universityMatch && statusMatch) {
      row.style.display = ""; // Show the row
    } else {
      row.style.display = "none"; // Hide the row
    }
  }
}
