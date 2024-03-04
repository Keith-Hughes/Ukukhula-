if(globalResponseData === undefined){
var globalResponseData = [];
}

GetAllRequests();

async function GetAllRequests() {
  
  const response = await fetchData(config.apiUrl+`StudentFundRequest/get/${sessionStorage.getItem("universityId")}`,"GET",{})

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

  globalResponseData.forEach((obj) => {
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


/**
 * Function Responsible for population data into the popUp table for a specific request.
 * Gets information from the current row and from the response data from the api.
 */
function populatePopUpTable(row){

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
  document.getElementById("cv-button").setAttribute("data-info2", row.cells[0].textContent);
  document.getElementById("transcript-button").setAttribute("data-info2", row.cells[0].textContent);
  document.getElementById("id-button").setAttribute("data-info2", row.cells[0].textContent);
  document.getElementById("upload-documents").setAttribute("data-info2", row.cells[0].textContent);


}
/**
 * Function Responsible for displaying buttons or hidding based on status.
 * Status=Review buttons will be shown else hidden
 */
function displayButtons(status){
  const editBtn = document.getElementById("edit-request")

  //showing/hiding buttons based on status
  if(status == "Review"){
    editBtn.style.display="block"
  }
  else{
    editBtn.style.display="none"
  }
}

function showModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'block';
  document.querySelector('.overlay2').style.display = 'block';
}

function hideModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'none';
  document.querySelector('.overlay2').style.display = 'none';
}

function initiateDownload(downloadLink, button) {
  // Create a temporary link and trigger a download
  const link = document.createElement('a');
  link.href = downloadLink;
  link.download = button.dataset.document;
  link.click();
}

async function displayDocumentButtons(requestId, fullName){
  const cvBtn = document.getElementById("cv-button");
  const transcriptBtn = document.getElementById("transcript-button");
  const idBtn = document.getElementById("id-button");
  //hide all buttons by default
  cvBtn.style.display = "none"
  transcriptBtn.style.display = "none"
  idBtn.style.display = "none"

  const cvData = await fetch(config.apiUrl+"UploadDocument/get/"+requestId+"/cv");
  if(cvData.ok){
    cvBtn.style.display = "block"
    const blob = await cvData.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    cvBtn.dataset.document = fullName+"_CV.pdf";
    cvBtn.dataset.downloadLink = link.href;
    cvBtn.addEventListener('click', function () {
      const downloadLink = cvBtn.dataset.downloadLink;
      if (downloadLink) {
          // Initiate download using the stored download link
          initiateDownload(downloadLink, cvBtn);
      } else {
          console.error('Document information not fetched.');
      }
  });

  }
  
  const trancriptData = await fetch(config.apiUrl+"UploadDocument/get/"+requestId+"/transcript");
  if(trancriptData.ok){
    transcriptBtn.style.display = "block"
    const blob = await trancriptData.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    transcriptBtn.dataset.document = fullName+"_Transcript.pdf";
    transcriptBtn.dataset.downloadLink = link.href;
    transcriptBtn.addEventListener('click', function () {
      const downloadLink = transcriptBtn.dataset.downloadLink;
      if (downloadLink) {
          // Initiate download using the stored download link
          initiateDownload(downloadLink, transcriptBtn);
      } else {
          console.error('Document information not fetched.');
      }
  });

  }
  
  const idData = await fetch(config.apiUrl+"UploadDocument/get/"+requestId+"/IDDocument");
    if(idData.ok){
      idBtn.style.display = "block"
    const blob = await idData.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    idBtn.dataset.document = fullName+"_ID.pdf";
    idBtn.dataset.downloadLink = link.href;
    idBtn.addEventListener('click', function () {
      const downloadLink = idBtn.dataset.downloadLink;
      if (downloadLink) {
          // Initiate download using the stored download link
          initiateDownload(downloadLink, idBtn);
      } else {
          console.error('Document information not fetched.');
      }
  });

  }
}

function openPopup(row) {
  checkTokenValidity();
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popup');
  
  populatePopUpTable(row);
  const status = globalResponseData.filter(function(request){return request["idNumber"] == row.cells[3].textContent})[0]["fundRequestStatus"];
  displayButtons(status);
  displayDocumentButtons(row.cells[0].textContent, row.cells[1].textContent);

  // Show the overlay and fade in the popup
  overlay.style.display = 'block';
  popup.style.display = 'block';
  setTimeout(() => {
      popup.style.opacity = 1;
  }, 10);


  const uploadDocsBtn = document.getElementById("upload-documents");

  uploadDocsBtn.addEventListener("click", function(event){
    event.preventDefault();
    showModal('.request-form');

    const approveModal = document.getElementById("new-request");
    approveModal.addEventListener("submit",async function(event){
      event.preventDefault();
      const data = await fetchData(config.apiUrl+"StudentFundRequest/" + approveBtn.getAttribute("data-value") + "/approve","PUT", "");
      const requestID = data.ID
      if(requestID == 0){
        alert(data.Comment);
      }
      else{
      alert(`${data.firstName}'s funding request Has been approved`);
      }
      hideModal('.modal');

      closePopup();
      //reload section after approval
      loadSection("StudentRequest");
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

function validateDate() {
  // Get the selected date from the input
  const selectedDate = new Date(document.getElementById("dob").value);

  // Calculate the maximum allowed birth date for a person not older than 35
  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 35);
  console.log(maxBirthDate);
  console.log(selectedDate);
  // Check if the selected date is within the allowed range
  if (selectedDate < maxBirthDate) {
      alert("Person must be 35 years or younger.");
      // Clear the selected date or take appropriate action
      document.getElementById("dob").value = "";
  }
}

function populateFilterOptions() {

  let statusFilter = document.getElementById("statusFilter");


  let statusValues = getUniqueColumnValues(
    document.getElementById("StudentRequestTable"),5); 

 
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
  
  html2pdf().from(table).save();

});

document.getElementById("create-request").addEventListener("click", ()=>{
  showModal(".modal");

});

document.querySelector('.cancel-button.request').addEventListener("click", function() {
  hideModal('.modal');
  closePopup();
});

document
.getElementById("request-form")
.addEventListener("submit",async function (event) {
  event.preventDefault();
  //We need the university ID which we should
  //find in session storage if the user is logged in
  const UniversitId = parseInt(sessionStorage.getItem("universityId"));
  console.log(UniversitId);
  const requestData = {
    FirstName: document.getElementById("firstName").value,
    LastName: document.getElementById("lastName").value,
    Email: document.getElementById("email-request").value,
    PhoneNumber: document.getElementById("phoneNumber").value,
    RaceName: document.getElementById("raceName").value,
    GenderName: document.getElementById("genderName").value,
    BirthDate: document.getElementById("dob").value,
    IDNumber: document.getElementById("idNumber-request").value,
    Grade: parseInt(document.getElementById("lastAveGrade").value),
    Amount: parseInt(document.getElementById("amount-request").value),
    UniversityID: UniversitId,
  };

  const responseData =  await fetchData(config.apiUrl+"StudentFundRequest/create", "POST", requestData)
  console.log(responseData);
  if(responseData.isSuccess){
  console.log(responseData);
  const requestID = responseData.studentRequestID;
  const cvFile = document.getElementById("cv").files[0];
  const transcriptFile = document.getElementById("transcript").files[0];
  const idDocumentFile = document.getElementById("idDocument").files[0];

  const documentsFormData = new FormData();

  if (cvFile) {
      documentsFormData.append("CV", cvFile);
  }

  if (transcriptFile) {
      documentsFormData.append("Transcript", transcriptFile);
  }

  if (idDocumentFile) {
      documentsFormData.append("IDDocument", idDocumentFile);
  }

  if(cvFile || transcriptFile || idDocumentFile){
    const response = await fetch(config.apiUrl+"UploadDocument/"+requestID+"/upload", {
      method: "POST",
      body: documentsFormData,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    });
    
    if(response.ok){
      hideModal('.modal');
      alert("Successfully Submited");
      loadSection("universityStudentRequest");
    }
  }

  hideModal('.modal');
  alert(responseData.message);
  loadSection("universityStudentRequest");

  }
});





