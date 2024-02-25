document.addEventListener("DOMContentLoaded", () => {
  const studentrequestBTN = document.getElementById("studentRequestBTN");

  studentrequestBTN.addEventListener("click", async () => {
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
    const dataResponse2 = await response.json();
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
});
