async function populateTable() {
    const applications =await fetchData("http://localhost:5263/api/Admin/GetAllUniversityRequests","GET");
    const tbody = document.querySelector("#UniversitY-request-table tbody");
    applications.forEach((application) => {
      const tr = document.createElement("tr");

      const requestID = document.createElement("td");
      requestID.textContent = application.requestID;
      tr.appendChild(requestID);

      const university = document.createElement("td");
      university.textContent = application.university;
      tr.appendChild(university);

      const province = document.createElement("td");
      province.textContent = application.province;
      tr.appendChild(province);

      const status = document.createElement("td");
      switch (application.status) {
        case "Approved":
          status.setAttribute("class", "status-column-approved");
          break;
        case "Rejected":
          status.setAttribute("class", "status-column-rejected");
          break;
        default:
          status.setAttribute("class", "status-column-pending");
      }
      status.textContent = application.status;
      tr.appendChild(status);

      const dateCreated = document.createElement("td");
      dateCreated.textContent = application.dateCreated.split("T")[0];
      tr.appendChild(dateCreated);

      const actionCell = document.createElement("td");
      const viewButton = document.createElement("button");
      viewButton.textContent = "View Application";
      viewButton.addEventListener("click", () => {
        location.href = "/pages/AdminDashboard/UniversityRequest.html";
      });

      viewButton.setAttribute("class", "View-application-button");

      actionCell.appendChild(viewButton);
      tr.appendChild(actionCell);
      tbody.appendChild(tr);
    });
    populateFilterOptions()
  }
  populateTable();
  


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
  let table = document.getElementById("UniversitY-request-table");
  let rows = table.getElementsByTagName("tr");

  // Loop through all table rows, hide those that don't match the filter criteria
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    let university = row.cells[1].textContent;
    let status = row.cells[3].textContent;
    let date = row.cells[4].textContent;

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
  const table = document.getElementById("UniversitY-request-table");
  

  let universityValues = getUniqueColumnValues(table,1); 
  let statusValues = getUniqueColumnValues(table,3); 

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