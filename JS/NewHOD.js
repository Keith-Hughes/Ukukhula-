function createOptions(methodName, bodyMessage) {
  if (methodName === "POST") {
    return {
      method: methodName,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(bodyMessage),
    };
  } else {
    return {
      method: methodName,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
  }
}

function populateDropdown(selectElement, values) {
  values.forEach(function (value) {
    let option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
}

if (universitiesDict === undefined) {
  var universitiesDict = {};
}
async function getUniversityName() {
  try {
    const universitiesObject = await fetch(
      config.apiUrl+"Admin/GetAllUniversities",
      createOptions("GET", {})
    );
    const universities = await universitiesObject.json();

    universities.forEach(function (university) {
      universitiesDict[university.id] = university.name;
    });

    let universityFilter = document.getElementById("universityFilter");
    populateDropdown(universityFilter, Object.values(universitiesDict));
  } catch (error) {
    console.error("Error fetching universities:", error);
  }
}
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

getUniversityName();

async function registerAdmin(
  emailText,
  phoneNumberText,
  firstNameText,
  lastNameText
) {
  try {
    let universityID = getKeyByValue(
      universitiesDict,
      document.getElementById("universityFilter").value
    );
    console.log(universityID);
    if (universityID == undefined) {
      document.getElementById("responseMessageHOD").style.color = "red";
      const errorMessage = "Please select a university";
      document.getElementById("responseMessageHOD").innerHTML = errorMessage;
    } else {
      const registerRequest = {
        phoneNumber: phoneNumberText,
        firstName: firstNameText,
        lastName: lastNameText,
        email: emailText,
        role: "University Admin",
      };
      const registerResponseObject = await fetch(
        config.apiUrl+"Auth/Register?universityID=" + universityID,
        createOptions("POST", registerRequest)
      );
      const registerResponse = await registerResponseObject.json();

      console.log(registerResponse);
      if (
        registerResponse["message"] === "Error inserting into contacts table"
      ) {
        document.getElementById("responseMessageHOD").style.color = "red";
        const errorMessage =
          "Error registering University Admin : A user with the same email or phone number alreadly exists.";
        document.getElementById("responseMessageHOD").innerHTML = errorMessage;
        return;
      }
      document.getElementById("responseMessageHOD").style.color = "green";
      document.getElementById("responseMessageHOD").innerHTML =
        "Successfully Registered " +
        firstNameText +
        " " +
        lastNameText +
        " as a University Admin";
      document.getElementById("admin-registration-form").reset();
      return;
    }
  } catch (error) {
    console.error("Error registering University Admin:", error);
  }
}

document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let firstNameInput = document.getElementById("first-name");
    if (!/^[A-Za-z]+$/.test(firstNameInput.value)) {
      document.getElementById("first-name-error").textContent =
        "Please enter alphabetic characters only";
    } else {
      document.getElementById("first-name-error").textContent = "";
    }

    var lastNameInput = document.getElementById("last-name");
    if (!/^[A-Za-z]+$/.test(lastNameInput.value)) {
      document.getElementById("last-name-error").textContent =
        "Please enter alphabetic characters only";
    } else {
      document.getElementById("last-name-error").textContent = "";
    }

    let emailInput = document.getElementById("email");

    let phoneNumberInput = document.getElementById("phone-number");
    if (!/^[0-9]{10}$/.test(phoneNumberInput.value)) {
      document.getElementById("phone-number-error").textContent =
        "Please enter a 10-digit phone number";
    } else {
      document.getElementById("phone-number-error").textContent = "";
    }
    registerAdmin(
      emailInput.value,
      phoneNumberInput.value,
      firstNameInput.value,
      lastNameInput.value
    );
  });
