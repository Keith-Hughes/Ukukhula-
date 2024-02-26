const applications = [
    {
      "university": "University of Toronto",
      "province": "Ontario",
      "amount":  5000,
      "status": "Approved",
      "dateCreated": "2024-02-23T12:19:20.676Z",
      "comment": "Excellent academic performance"
    },
    {
      "university": "McGill University",
      "province": "Quebec",
      "amount":  4000,
      "status": "Pending",
      "dateCreated": "2024-02-22T12:19:20.676Z",
      "comment": "Strong recommendation letters"
    },
    {
      "university": "University of British Columbia",
      "province": "British Columbia",
      "amount":  3000,
      "status": "Rejected",
      "dateCreated": "2024-02-21T12:19:20.676Z",
      "comment": "Needs improvement in essay"
    },
    {
      "university": "University of Alberta",
      "province": "Alberta",
      "amount":  2000,
      "status": "Approved",
      "dateCreated": "2024-02-20T12:19:20.676Z",
      "comment": "Highly qualified candidate"
    },
    {
      "university": "University of Saskatchewan",
      "province": "Saskatchewan",
      "amount":  1000,
      "status": "Pending",
      "dateCreated": "2024-02-19T12:19:20.676Z",
      "comment": "Good grades and work experience"
    }
  ];

function populateTable(){
    const tbody = document.querySelector("#UniversitY-request-table tbody");
    applications.forEach(application=>{
        const tr = document.createElement('tr');

        const university = document.createElement('td');
        university.textContent = application.university;
        tr.appendChild(university);

        const province = document.createElement('td');
        province.textContent = application.province;
        tr.appendChild(province);

        const status = document.createElement("td");
        switch(application.status){
            case "Approved":
                status.setAttribute("class","status-column-approved")
            break;
            case "Rejected":
                status.setAttribute("class","status-column-rejected")
            break;
            default:
                status.setAttribute("class","status-column-pending")
        }
        status.textContent = application.status;
        tr.appendChild(status);

        const actionCell = document.createElement('td')
        const viewButton = document.createElement("button");
        viewButton.textContent = "View Application"
        viewButton.addEventListener("click",()=>{
            location.href = "university-request.html"
        });

        viewButton.setAttribute("class","view-application-button");

        actionCell.appendChild(viewButton);
        tr.appendChild(actionCell);
        tbody.appendChild(tr);
    })
}

document.addEventListener('DOMContentLoaded',populateTable);
