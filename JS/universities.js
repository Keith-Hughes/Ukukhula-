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
      viewButton.addEventListener("click", function(event){event.preventDefault();openPopup(application);});
      viewButton.setAttribute("class", "View-application-button");

      actionCell.appendChild(viewButton);
      tr.appendChild(actionCell);
      tbody.appendChild(tr);
    });
    populateFilterOptions()
  }
  populateTable();

function openPopup(applications) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupContent = document.getElementById('popupContent');
    
    // Set the content of the popup (you can fetch the actual data here)

document.getElementById("universityName").innerHTML=applications.university;    
document.getElementById("province").innerHTML=applications.province;
        
document.getElementById("amount").innerHTML=applications.amount;
  
document.getElementById("dateCreated").innerHTML=applications.dateCreated.split("T")[0];
document.getElementById("comment").innerHTML=applications.comment;

document.getElementById("status").innerHTML=applications.status;
  
   
    
  
    // Show the overlay and fade in the popup
    overlay.style.display = 'block';
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.opacity = 1;
    }, 10);
  }
  
  function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
  
    // Fade out the popup and hide the overlay
    popup.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }, 300);
  }
  // Function to toggle editability of fields
function toggleEdit() {
  const editableFields = document.querySelectorAll('.editable-field');
  const editButton = document.querySelector('.edit-button');

  // Toggle contentEditable for all editable fields
  editableFields.forEach(field => {
      field.contentEditable = field.contentEditable === 'true' ? 'false' : 'true';
  });

  // Change the edit button text based on the current state
  const isEditing = editableFields[0].contentEditable === 'true'; // Check the state of one of the fields
  
  editableFields.forEach(field => {
    if (isEditing) {
        field.classList.add('edit-mode');
    } else {
        field.classList.remove('edit-mode');
    }
});
  
  editButton.textContent = isEditing ? 'Save' : 'Edit';

  // Save the edited content or perform any necessary action
  if (!isEditing) {
      saveEditedContent();
  }
}

// Function to save edited content (you can customize this based on your needs)
function saveEditedContent() {
  // Add logic to save the edited content to the backend or perform other actions
  console.log("Saving edited content");
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
