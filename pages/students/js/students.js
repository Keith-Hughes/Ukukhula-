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
            const firstName= document.createElement("td");
            const lastName =document.createElement("td");
            const university = document.createElement("td");
            const amount = document.createElement("td");
            const status = document.createElement("td");
            const action = document.createElement("td");
            const viewButton = document.createElement("button");

            firstName.textContent = application.firstName;
            lastName.textContent = application.lastName;
            university.textContent = application.universityName;
            amount.textContent = `R${application.amount}`;
            status.textContent = application.fundRequestStatus;
            viewButton.textContent = "View Application";
            action.appendChild(viewButton);

            tr.appendChild(firstName);
            tr.appendChild(lastName);
            tr.appendChild(university);
            tr.appendChild(amount);
            tr.appendChild(status);
            tr.appendChild(action);
            tbody.appendChild(tr);
       });
    });