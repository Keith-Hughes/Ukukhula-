async function fetchUnivesities(){
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  const response = await fetch(
    `${config.apiUrl}Admin/GetAllUniversityRequests`,
    options
  );
  return await response.json();
}

async function populateTable() {
	const tbody = document.querySelector("#UniversitY-request-table tbody");
  tbody.innerHTML = '';
//const response = 
const applications = await fetchUnivesities();

applications.forEach((application) => {
		const tr = document.createElement("tr");

		const requestID = document.createElement("td");
		requestID.textContent = application.requestID;
		tr.appendChild(requestID);

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

		const dateCreated = document.createElement("td");
		dateCreated.textContent = application.dateCreated.split("T")[0];
		tr.appendChild(dateCreated);

		const actionCell = document.createElement("td");
		const viewButton = document.createElement("button");
		viewButton.textContent = "View Application";
		viewButton.addEventListener("click", async function (event) {
			event.preventDefault();
			openPopup(application);
		});
		viewButton.setAttribute("class", "View-application-button");

		actionCell.appendChild(viewButton);
		tr.appendChild(actionCell);
		tbody.appendChild(tr);
	});
	populateFilterOptions();
}
populateTable();

function openPopup(application) {
	const popup = document.getElementById("popup");
	const overlay = document.getElementById("overlay");
	const popupContent = document.getElementById("popupContent");

	// Set the content of the popup (you can fetch the actual data here)

	document.getElementById("universityName").innerHTML =
		application.university;
	document.getElementById("province").innerHTML = application.province;

	document.getElementById("amount").innerHTML = application.amount;

	document.getElementById("dateCreated").innerHTML =
		application.dateCreated.split("T")[0];
	document.getElementById("comment").innerHTML = application.comment;

	document.getElementById("status").innerHTML = application.status;

	const approveButton = document.getElementById("approveButton");
	const rejectButton = document.getElementById("rejectButton");

	rejectButton.addEventListener("click", async (event) => {
		event.preventDefault(), await rejectWithMessage(application.requestID);
	});

	approveButton.addEventListener("click", async (event) => {
		event.preventDefault();
		await approveApplication(application.requestID);
	});

	overlay.style.display = "block";
	popup.style.display = "block";
	setTimeout(() => {
		popup.style.opacity = 1;
	}, 10);
}

async function approveApplication(requestId) {
	try {
		const confirmed = window.confirm(
			"Are you sure you want to approve this application?"
		);
		if (!confirmed) return;
		const url = `http://localhost:5263/api/Admin/updateUniversityRequest?requestId=${requestId}&statusId=1`;
		const data = await fetchData(url, "PUT", {});
    closePopup();
	} catch (error) {
		console.error("Failed to update request:", error);
	}
}

async function rejectWithMessage(requestId) {

	try {
		openRejectModal()
    const rejectSubmit = document.getElementById("submitRejection");
    rejectSubmit.addEventListener("click",async (event)=>{
      event.preventDefault();
      alert("called")
      const comment = document.getElementById("reject-reason").value;
      const url = `http://localhost:5263/api/Admin/rejectUniversityRequest?requestId=${requestId}&statusId=2&comment=${comment}`;
      await fetchData(url, "PUT", {});
      closeRejectModal();
      closePopup();
    })
		
	} catch (error) {
		console.error("Failed to update request:", error);
	}
}

function closePopup() {
	const popup = document.getElementById("popup");
	const overlay = document.getElementById("overlay");

	popup.style.opacity = 0;
	setTimeout(() => {
		popup.style.display = "none";
		overlay.style.display = "none";
	}, 300);
}

function getUniqueColumnValues(table, columnIndex) {
	let values = [];
	let rows = table.getElementsByTagName("tr");
	for (let i = 1; i < rows.length; i++) {
		let row = rows[i];
		let cellValue = row.cells[columnIndex].textContent;
		if (!values.includes(cellValue)) {
			values.push(cellValue);
		}
	}
	return values;
}

function filterTable() {
	// Get selected values from filters
	let universityFilter = document.getElementById("universityFilter").value;
	let statusFilter = document.getElementById("statusFilter").value;
	let startDate = document.getElementById("startDate").value;
	let endDate = document.getElementById("endDate").value;

	// Get the table and rows
	let table = document.getElementById("UniversitY-request-table");
	let rows = table.getElementsByTagName("tr");

	// Loop through all table rows, hide those that don't match the filter criteria
	for (let i = 1; i < rows.length; i++) {
		let row = rows[i];
		let university = row.cells[1].textContent;
		let status = row.cells[3].textContent;
		let date = row.cells[4].textContent;

		let universityMatch =
			universityFilter === "" || university === universityFilter;
		let statusMatch = statusFilter === "" || status === statusFilter;
		let dateInRange =
			(startDate === "" || date >= startDate) &&
			(endDate === "" || date <= endDate);

		if (universityMatch && statusMatch && dateInRange) {
			row.style.display = ""; 
		} else {
			row.style.display = "none"; 
		}
	}
}

function populateFilterOptions() {
	let universityFilter = document.getElementById("universityFilter");
	let statusFilter = document.getElementById("statusFilter");
	const table = document.getElementById("UniversitY-request-table");

	let universityValues = getUniqueColumnValues(table, 1);
	let statusValues = getUniqueColumnValues(table, 3);

	populateDropdown(universityFilter, universityValues);
	populateDropdown(statusFilter, statusValues);
}

function populateDropdown(selectElement, values) {
	values.forEach(function (value) {
		let option = document.createElement("option");
		option.value = value;
		option.textContent = value;
		selectElement.appendChild(option);
	});
}

function openRejectModal() {
  const modal = document.getElementById('popup-content');
  modal.style.display = 'block';
}

function closeRejectModal() {
  const modal = document.getElementById("popup-content");
  modal.style.display = "none";
}