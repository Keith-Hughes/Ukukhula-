function createOptions(method, bodyMessage) {
  return {
    method: method,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
}

function populateDropdown(selectElement, values) {
  values.forEach(function (value) {
    let option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
}
let universitiesDict = {};
async function getUniversityName() {
  try {
    const universitiesObject = await fetch(
      "http://localhost:5263/api/Admin/GetAllUniversities",
      createOptions("GET", {})
    );
    const universities = await universitiesObject.json();

    let universitiesDict = {};

    universities.forEach(function (university) {
      universitiesDict[university.id] = university.name;
    });

    console.log(universitiesDict);
    let universityFilter = document.getElementById("universityFilter");
    populateDropdown(universityFilter, Object.values(universitiesDict));
  } catch (error) {
    console.error("Error fetching universities:", error);
  }
}
getUniversityName();

document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    // First Name validation
    var firstNameInput = document.getElementById("first-name");
    if (!/^[A-Za-z]+$/.test(firstNameInput.value)) {
      document.getElementById("first-name-error").textContent =
        "Please enter alphabetic characters only";
      event.preventDefault();
    } else {
      document.getElementById("first-name-error").textContent = "";
    }

    // Last Name validation
    var lastNameInput = document.getElementById("last-name");
    if (!/^[A-Za-z]+$/.test(lastNameInput.value)) {
      document.getElementById("last-name-error").textContent =
        "Please enter alphabetic characters only";
      event.preventDefault();
    } else {
      document.getElementById("last-name-error").textContent = "";
    }

    // Email validation (HTML5 validation handles this for us)

    // Phone Number validation
    var phoneNumberInput = document.getElementById("phone-number");
    if (!/^[0-9]{10}$/.test(phoneNumberInput.value)) {
      document.getElementById("phone-number-error").textContent =
        "Please enter a 10-digit phone number";
      event.preventDefault();
    } else {
      document.getElementById("phone-number-error").textContent = "";
    }
  });
