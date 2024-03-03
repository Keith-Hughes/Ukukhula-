// let universityFilter = document.getElementById("universityFilter");
// let universityValues = getUniqueColumnValues(table, 1);

// populateDropdown(universityFilter, universityValues);

// function populateDropdown(selectElement, values) {
//   values.forEach(function (value) {
//     let option = document.createElement("option");
//     option.value = value;
//     option.textContent = value;
//     selectElement.appendChild(option);
//   });
// }

// function getUniqueColumnValues(table, columnIndex) {
//   let values = [];
//   let rows = table.getElementsByTagName("tr");
//   for (let i = 1; i < rows.length; i++) {
//     let row = rows[i];
//     let cellValue = row.cells[columnIndex].textContent;
//     if (!values.includes(cellValue)) {
//       values.push(cellValue);
//     }
//   }
//   return values;
// }
