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
      viewButton.addEventListener("click", () => {
        location.href = "/pages/AdminDashboard/UniversityRequest.html";
      });

      viewButton.setAttribute("class", "View-application-button");

      actionCell.appendChild(viewButton);
      tr.appendChild(actionCell);
      tbody.appendChild(tr);
    });
  }

  populateTable();
}
