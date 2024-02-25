document.addEventListener("DOMContentLoaded", async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
  
      const response = await fetch(
        "http://localhost:5263/api/StudentFundRequest",
        options
      );
      const tbody = document.querySelector("tbody");
      const studentApplications = await response.json();
       studentApplications.forEach(application => {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.textContent = application.firstName +" "+ application.lastName;
            tr.appendChild(td);
            tbody.appendChild(tr);
       });
    });