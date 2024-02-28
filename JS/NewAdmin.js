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

async function registerAdmin(
  emailText,
  phoneNumberText,
  firstNameText,
  lastNameText
) {
  try {
    let universityID = 0;
    const registerRequest = {
      phoneNumber: phoneNumberText,
      firstName: firstNameText,
      lastName: lastNameText,
      email: emailText,
      role: "BBD Admin",
    };
    const registerResponseObject = await fetch(
      "http://localhost:5263/api/Auth/Register?universityID=" + universityID,
      createOptions("POST", registerRequest)
    );
    const registerResponse = await registerResponseObject.json();

    console.log(registerResponse);
    alert("Successfully Registered " + firstNameText + " " + lastNameText);
  } catch (error) {
    console.error("Error registering BBD Admin:", error);
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
