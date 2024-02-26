const fetchApplications = async()=>{
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
  const applications = await response.json();
  return applications;
}



if (typeof applications === "undefined") {
  (async function populateTable() {
 
  const applications =await fetchApplications()
  const tbody = document.querySelector("#UniversitY-request-table tbody");

  tbody.innerHTML = '';

   const applicationGroups = {
      Approved: [],
      Rejected: [],
      Review: []
  };

  // Group applications based on status
  applications.forEach(application => {
      applicationGroups[application.status].push(application);
  });

  // Populate dropdowns for each status
  Object.keys(applicationGroups).forEach(status => {
      const trDropdown = document.createElement('tr');
      trDropdown.innerHTML = `
          <td colspan="4" class="status-dropdown" data-status="${status.toLowerCase()}">
         
              <details> <select><option>University Of Limpopo</option></select>
                  <summary>${status} (${applicationGroups[status].length} applications)</summary>
                  <table class="status-detail" data-status="${status.toLowerCase()}">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Province</th>
                              <th>Status</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${applicationGroups[status].map(application => `
                              <tr>
                                  <td>${application.university}</td>
                                  <td>${application.province}</td>
                                  <td>${status}</td>
                                  <td>
                                      <button class="view-application-button" onclick="location.href='../universities/university-request.html'">View Application</button>
                                  </td>
                              </tr>`).join('')}
                      </tbody>
                  </table>
              </details>
          </td>`;
      tbody.appendChild(trDropdown);
  });
  })()

}
