async function fetchUnivesities(){
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    "http://localhost:5263/api/Admin/GetAllUniversityRequests",
    options
  );
  return await response.json();
}
if (typeof applications === "undefined") {
 
  async function populateTable() {
    const applications = await fetchUnivesities();
    const tbody = document.querySelector("#UniversitY-request-table tbody");
    applications.forEach((application) => {
      const tr = document.createElement("tr");

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

      const actionCell = document.createElement("td");
      const viewButton = document.createElement("button");
      viewButton.textContent = "View Application";
      viewButton.addEventListener("click", function(event){event.preventDefault();openPopup(application);});
      viewButton.setAttribute("class", "View-application-button");

      actionCell.appendChild(viewButton);
      tr.appendChild(actionCell);
      tbody.appendChild(tr);
    });
  }

  populateTable();
}

function openPopup(applications) {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  const popupContent = document.getElementById('popupContent');
  
  // Set the content of the popup (you can fetch the actual data here)
  popupContent.innerHTML = 

  `<table id="allRequests">


  <tr class="row">
      <td class="col-title"><b>University Name:</b> ${applications.university}</td>
      
      <td class="col-title"><b>Province:</b> ${applications.province}</td>
      
      <td class="col-title"><b>Amount:</b> ${applications.amount}</td>

      <td class="col-title"><b>DateCreated:</b> ${applications.datecreated}</td> 
  </tr> 
  <tr class="row"
      <td class="col-title"><b>comment:</b> ${applications.comment}</td> 

 
  </table>
  <article class=status-buttons>
  <button id="approve" class="View-application-button" data-value= university>Approve</button>
  <button id="reject" class="View-application-button" data-value= university>Reject</button>
  </article>`;

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
