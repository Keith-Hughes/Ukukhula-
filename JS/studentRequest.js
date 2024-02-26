let dataResponse2=GetAllRequests();




async function GetAllRequests(){
    const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  
  const response = await fetch("http://localhost:5263/api/StudentFundRequest",options);
  const dataResponse2 = await response.json();
  console.log(dataResponse2);
  const display = document.getElementById("StudentRequestPARA");

  const table = document.createElement("table");
  table.setAttribute('id', 'StudentRequestTable')

  const headerRow = document.createElement("tr");

  const keys = [
    "id",
    "firstName",
    "lastName",
    "universityName",
    "idNumber",
    "amount",
    "fundRequestStatus",
  ];

  const columnHeadings = [
      "id",
      "Full Name",
      "university",
      "ID Number",
      "Amount",
      "Status",
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
      if(key === "firstName"){
          const cell = document.createElement("td");
          cell.textContent = obj[key]+" "+obj["lastName"];
          row.appendChild(cell);
      }
      else if(key === "lastName"){
          
      }

      else{
      const cell = document.createElement("td");
      cell.textContent = obj[key];
      row.appendChild(cell);
      }
    });
    table.appendChild(row);
  });

  display.appendChild(table);
  populateFilterOptions();
  return dataResponse2
}

function createOptions(methodName, bodyMessage) {
    bodyTemp = methodName === "POST" ? body : null;
    return ({
        method: methodName,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,

        },
        bodyTemp: bodyMessage,

    });
    
    
}

// function create
   
    const form = document.getElementById("request-form");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        //We need the university ID which we should 
        //find in session storage if the user is logged in
        const UniversitId =  parseInt(sessionStorage.getItem("universityId"));
        console.log(UniversitId)
        const requestData = {
         firstName : document.getElementById("firstName").value,
         lastName : document.getElementById("lastName").value,
         email : document.getElementById("email").value,
         phoneNumber : document.getElementById("phoneNumber").value,
         raceName : document.getElementById("race").value,
         genderName : document.getElementById("gender").value,
         birthDate : document.getElementById("dob").value,
         idNumber : document.getElementById("idNumber").value,
         grade : parseInt(document.getElementById("lastAveGrade").value),
         amount : parseInt(document.getElementById("amount").value),

         universityID : UniversitId
        };
        
        
        const options = createOptions("POST", JSON.stringify(requestData));
        fetch("http://localhost:5263/api/StudentFundRequest/create", options)
        .then(respons=> respons.json())
        .then(data=> window.alert(data.message));
    })





    



function getUniqueColumnValues(table, columnIndex) {
    var values = [];
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cellValue = row.cells[columnIndex].textContent;

        if (!values.includes(cellValue)) {
            values.push(cellValue);
        }
    }

    return values;
}

function filterTable() {
    // Get selected values from filters
    var universityFilter = document.getElementById("universityFilter").value;
    var statusFilter = document.getElementById("statusFilter").value;

    // Get the table and rows
    var table = document.getElementById("StudentRequestTable");
    var rows = table.getElementsByTagName("tr");

    // Loop through all table rows, hide those that don't match the filter criteria
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var university = row.cells[2].textContent;
        var status = row.cells[5].textContent;

        var universityMatch = universityFilter === '' || university === universityFilter;
        var statusMatch = statusFilter === '' || status === statusFilter;

        if (universityMatch && statusMatch) {
            row.style.display = "";  // Show the row
        } else {
            row.style.display = "none";  // Hide the row
        }
    }
}

function populateFilterOptions() {
    var universityFilter = document.getElementById("universityFilter");
    var statusFilter = document.getElementById("statusFilter");

    var universityValues = getUniqueColumnValues(document.getElementById("StudentRequestTable"), 2); // Assuming university is in the third column
    var statusValues = getUniqueColumnValues(document.getElementById("StudentRequestTable"), 5); // Assuming status is in the sixth column

    populateDropdown(universityFilter, universityValues);
    populateDropdown(statusFilter, statusValues);
}

// Helper function to populate a dropdown with options
function populateDropdown(selectElement, values) {
    values.forEach(function(value) {
        var option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        selectElement.appendChild(option);
    });
}


