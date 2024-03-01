"../../JS/NewAdmin.js";
function loadScripts(scriptPaths) {
  scriptPaths.forEach(function (scriptPath) {
    var script = document.createElement("script");
    script.src = scriptPath;
    // script.type = "text/javascript";
    document.body.appendChild(script);
  });
}

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
    if (registerResponse["message"] === "Error inserting into contacts table") {
      document.getElementById("responseMessageAdmin").style.color = "red";
      const errorMessage =
        "Error registering BBD Admin : A user with the same email or phone number alreadly exists.";
      document.getElementById("responseMessageAdmin").innerHTML = errorMessage;
      return;
    }
    document.getElementById("responseMessageAdmin").style.color = "green";
    document.getElementById("responseMessageAdmin").innerHTML =
      "Successfully Registered " +
      firstNameText +
      " " +
      lastNameText +
      " as a BBD Admin";
    document.getElementById("admin-registration-form").reset();
  } catch (error) {
    // const errorMessage = "Error registering BBD Admin:" + error;
    if (JSON.stringify(error).includes("Error inserting into contacts table")) {
    }

    // console.error("Error registering BBD Admin:", error);
  }
}
document
  .getElementById("admin-registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let firstNameInput = document.getElementById("admin-first-name");
    if (!/^[A-Za-z]+$/.test(firstNameInput.value)) {
      document.getElementById("admin-first-name-error").textContent =
        "Please enter alphabetic characters only";
    } else {
      document.getElementById("admin-first-name-error").textContent = "";
    }

    var lastNameInput = document.getElementById("admin-last-name");
    if (!/^[A-Za-z]+$/.test(lastNameInput.value)) {
      document.getElementById("admin-last-name-error").textContent =
        "Please enter alphabetic characters only";
    } else {
      document.getElementById("admin-last-name-error").textContent = "";
    }

    let emailInput = document.getElementById("admin-email");

    let phoneNumberInput = document.getElementById("admin-phone-number");
    if (!/^[0-9]{10}$/.test(phoneNumberInput.value)) {
      document.getElementById("admin-phone-number-error").textContent =
        "Please enter a 10-digit phone number";
    } else {
      document.getElementById("admin-phone-number-error").textContent = "";
    }
    registerAdmin(
      emailInput.value,
      phoneNumberInput.value,
      firstNameInput.value,
      lastNameInput.value
    );

    document.getElementById("cancel").addEventListener("click", function(event){
      event.preventDefault();
      closePopup("NewAdmin");
    })
  });
