if(globalResponseData === undefined){
var globalResponseData = [];
}

GetAllRequests();

async function GetAllRequests() {
  
  const response = await fetchData("http://localhost:5263/api/StudentFundRequest","GET",{})

  const dataResponse2 = response;
  globalResponseData = dataResponse2;

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
    "University",
    "ID Number",
    "Amount",
    "Status",
    "Date Submitted",
    "Action"
  ];

  columnHeadings.forEach((eachHeading) => {
    const th = document.createElement("th");
    th.textContent = eachHeading;
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  dataResponse2.forEach((obj) => {
    const row = document.createElement("tr");
    let fullName = "";
    keys.forEach((key) => {
        const cell = document.createElement("td");
        
      if (key === "firstName") {
        fullName = obj[key] + " " + obj["lastName"];
        cell.textContent = fullName;
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
    const actionCell = document.createElement("td");
    const viewButton = document.createElement("button");
      viewButton.textContent = "View Application";
      viewButton.addEventListener("click", function(event){event.preventDefault();openPopup(row);});
      viewButton.setAttribute("class", "View-application-button");
      actionCell.appendChild(viewButton)
      row.appendChild(actionCell);
      
    table.appendChild(row);
  });

  display.appendChild(table);
  populateFilterOptions();
  return dataResponse2;
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

function openPopup(row) {
  checkTokenValidity();
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  const popupContent = document.getElementById('popupContent');
  
  document.getElementById("fullName").innerHTML =  row.cells[1].textContent;
  document.getElementById("idNumber").innerHTML =  row.cells[3].textContent;
  document.getElementById("contact").innerHTML =  globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["phoneNumber"];
  document.getElementById("email").innerHTML =  globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["email"];
  document.getElementById("amount").innerHTML = row.cells[4].textContent;
  document.getElementById("date-created").innerHTML = row.cells[6].textContent;
  document.getElementById("university").innerHTML = row.cells[2].textContent;
  document.getElementById("grade").innerHTML = globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["grade"];
  document.getElementById("age").innerHTML = globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["age"];
  document.getElementById("race").innerHTML = globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["raceName"];
  document.getElementById("gender").innerHTML = globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["genderName"];
  document.getElementById("document").innerHTML = globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["documentStatus"];
  document.getElementById("status").innerHTML = globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["fundRequestStatus"];
  document.getElementById("comment").innerHTML = globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["comment"];

  const status = globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["fundRequestStatus"];
  const statusButtons = document.getElementById("status-buttons");
  const editBtn = document.getElementById("edit-request")
  if(status == "Review"){
    statusButtons.style.display = "Flex";
    editBtn.style.display="block"
  }
  // Set the content of the popup (you can fetch the actual data here)
  
  //     <td class="col-title"><b>Email:</b> ${}</td>  
  // </tr>
  // <tr class="row">
  //     <td class="col-title"><b>Amount Requested:</b> R<span class="editable-field" data-field="amount">${}<span></td>
      
  //     <td class="col-title"><b>Date Submitted:</b> ${row.cells[6].textContent}</td>
      
  //     <td class="col-title"><b>University:</b> ${row.cells[2].textContent}</td>

  //     <td class="col-title"><b>Last Ave Grade:</b><span class="editable-field" data-field="grade"> ${globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["grade"]}<span></td>  
  // </tr>
  // <tr class="row">
  //     <td class="col-title"><b>Age:</b> ${globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["age"]}</td>
      
  //     <td class="col-title"><b>Race:</b> ${globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["raceName"]}</td>
      
  //     <td class="col-title"><b>Gender:</b> ${globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["genderName"]}</td>


  //     <td class="col-title"><b>Document Status:</b> ${globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["documentStatus"]}</td>  
  // </tr>
  // <tr class="row">
  //     <td class="col-title"><b>Request Status</b>:</b> ${globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["fundRequestStatus"]}</td>
  // </tr>
  // <tr class="row">
  //     <td class="col-title"><b>Comments:</b><span class="editable-field" data-field="comment"> ${globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["comment"]}<span></td> 
        
  // </tr>
  // </table>
  // <article class=status-buttons>
  // <button id="approve" class="View-application-button" data-value=${globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["id"]}>Approve</button>
  // <button id="reject" class="View-application-button" data-value=${globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["id"]}>Reject</button>
  // </article>`;

  // Show the overlay and fade in the popup
  overlay.style.display = 'block';
  popup.style.display = 'block';
  setTimeout(() => {
      popup.style.opacity = 1;
  }, 10);
  const rejectBtn = document.getElementById("reject");
  const commentPopup = document.getElementById("popup-content");

  rejectBtn.addEventListener("click",async function(event){
    event.preventDefault();
    console.log(rejectBtn.getAttribute("data-value"));
    const commentElement = popupContent.querySelector('.editable-field[data-field="comment"]');
    const commentContent = commentElement.textContent.trim();
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('.overlay2').style.display = 'block';
    const modalForm = document.getElementById("modal-form");
    modalForm.addEventListener("submit", async function(e) {
      e.preventDefault();

      const reason = document.getElementById("reject-reason").value;

      if (reason == "") {
        // Handle the case when the reason is empty
        alert("Please provide a reason for rejection.");
        return;
      }

      // Continue with your logic here
      console.log(reason);

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body:"",
      };

      const response = await fetch("http://localhost:5263/api/StudentFundRequest/" + rejectBtn.getAttribute("data-value") + "/reject?comment="+reason, options);
      const data = await response.json();
      console.log(data);

      // Hide the modal after submission
      document.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay2').style.display = 'none';
    });

    const cancelButton = document.getElementById("cancel-button");
    cancelButton.addEventListener("click", function() {
      document.querySelector('.modal').style.display = 'none';
      document.querySelector('.overlay2').style.display = 'none';
    });

  });
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

document.getElementById('downloadButton').addEventListener('click', () => {
  const table = document.getElementById('StudentRequestPARA');
  console.log("Table retreived" +table);
  
  // Options for pdf generation
  // const pdfOptions = {
  //     margin: 10,
  //     filename: 'table-export.pdf',
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  // };
  console.log("options created");
  html2pdf().from(table).save();
  // Use html2pdf.js to generate PDF
  // html2pdf().from(table).set(pdfOptions).outputPdf().then(pdf => {
  //     // Trigger the download
  //     const blob = new Blob([pdf], { type: 'application/pdf' });
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(blob);
  //     link.download = pdfOptions.filename;
  //     link.click();
  // });
});

document.getElementById
