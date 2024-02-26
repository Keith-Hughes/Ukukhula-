
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

document.addEventListener("DOMContentLoaded", function(){
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
})

if (typeof studentrequestBTN === "undefined") {
  const studentrequestBTN = document.getElementById("studentRequestBTN");

  studentrequestBTN.addEventListener("click", async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };

    const response = await fetch(
      "http://localhost:5263/api/StudentFundRequest",options);
    const dataResponse2 = await response.json();
    console.log(dataResponse2);
    const display = document.getElementById("StudentRequestPARA");

    const table = document.createElement("table");

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

    keys.forEach((key) => {
      const th = document.createElement("th");
      th.textContent = key;
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    dataResponse2.forEach((obj) => {
      const row = document.createElement("tr");
      keys.forEach((key) => {
        const cell = document.createElement("td");
        cell.textContent = obj[key];
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    display.appendChild(table);
  });
}
