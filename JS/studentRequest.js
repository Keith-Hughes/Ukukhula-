GetAllRequests();

async function GetAllRequests() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  const response = await fetch(
    "http://localhost:5263/api/StudentFundRequest",
    options
  );
  const dataResponse2 = await response.json();
  const display = document.getElementById("StudentRequestPARA");

  const table = document.createElement("table");
  table.setAttribute("id", "StudentRequestTable");

  const headerRow = document.createElement("tr");

  const keys = [
    "id",
    "firstName",
    "lastName",
    "universityName",
    "idNumber",
    "amount",
    "fundRequestStatus",
    "requestCreatedDate",
  ];

  const columnHeadings = [
    "id",
    "Full Name",
    "university",
    "ID Number",
    "Amount",
    "Status",
    "Date Submitted",
  ];

  columnHeadings.forEach((eachHeading) => {
    const th = document.createElement("th");
    th.textContent = eachHeading;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  dataResponse2.forEach((obj) => {
    const row = document.createElement("tr");
    keys.forEach((key) => {
        const cell = document.createElement("td");
      if (key === "firstName") {
        
        cell.textContent = obj[key] + " " + obj["lastName"];
        row.appendChild(cell);
      } else if (key === "lastName") {
      } else if (key === "requestCreatedDate") {
        
        cell.textContent = obj[key].split("T")[0];
        row.appendChild(cell);
      } else {
        cell.textContent = obj[key];
        row.appendChild(cell);
      }
    });
    table.appendChild(row);
  });

  display.appendChild(table);
  populateFilterOptions();
  return dataResponse2;
}

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

// function create

document
  .getElementById("request-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    //We need the university ID which we should
    //find in session storage if the user is logged in
    const UniversitId = parseInt(sessionStorage.getItem("universityId"));
    console.log(UniversitId);
    const requestData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      raceName: document.getElementById("race").value,
      genderName: document.getElementById("gender").value,
      birthDate: document.getElementById("dob").value,
      idNumber: document.getElementById("idNumber").value,
      grade: parseInt(document.getElementById("lastAveGrade").value),
      amount: parseInt(document.getElementById("amount").value),

      universityID: UniversitId,
    };

    const options = createOptions("POST", JSON.stringify(requestData));
    fetch("http://localhost:5263/api/StudentFundRequest/create", options)
      .then((respons) => respons.json())
      .then((data) => window.alert(data.message));
  });

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

function filterTable() {
  // Get selected values from filters
  let universityFilter = document.getElementById("universityFilter").value;
  let statusFilter = document.getElementById("statusFilter").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  // Get the table and rows
  let table = document.getElementById("StudentRequestTable");
  let rows = table.getElementsByTagName("tr");

  // Loop through all table rows, hide those that don't match the filter criteria
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    let university = row.cells[2].textContent;
    let status = row.cells[5].textContent;
    let date = row.cells[6].textContent;

    let universityMatch =
      universityFilter === "" || university === universityFilter;
    let statusMatch = statusFilter === "" || status === statusFilter;
    let dateInRange = (startDate === '' || date >= startDate) && (endDate === '' || date <= endDate);

    if (universityMatch && statusMatch && dateInRange) {
      row.style.display = ""; // Show the row
    } else {
      row.style.display = "none"; // Hide the row
    }
  }
}

function populateFilterOptions() {
  let universityFilter = document.getElementById("universityFilter");
  let statusFilter = document.getElementById("statusFilter");

  let universityValues = getUniqueColumnValues(
    document.getElementById("StudentRequestTable"),2); 
  let statusValues = getUniqueColumnValues(
    document.getElementById("StudentRequestTable"),5); 

  populateDropdown(universityFilter, universityValues);
  populateDropdown(statusFilter, statusValues);
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
