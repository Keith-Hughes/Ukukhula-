function cancelForm() {
  window.location.href = "../";
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("ApplyUniversity")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      try {
        showLoadingScreen();
        const formData = {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          contactNumber: document.getElementById("contactNumber").value,
          universityName: document.getElementById("universityName").value,
          province: document.getElementById("province").value,
          amount: document.getElementById("amount").value,
        };

        console.log(formData);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        };

        const response = await fetch(
          config.apiUrl + "Admin/newUniversityRequest",
          options
        );

        const data = await response.json();
        console.log(data);

        closeLoadingScreen();
        if (data != null) {
          document.getElementById("ResponseText").style.color = "green";
          document.getElementById("ResponseText").innerHTML =
            "Congratulations. You have created a University Application. Look out for the response";
          //   document.getElementById("ApplyUniversity").reset();
        } else {
          document.getElementById("ResponseText").style.color = "red";
          document.getElementById("ResponseText").innerHTML =
            "Error encountered while creating a University Application.";
        }
      } catch (error) {
        closeLoadingScreen();
        console.log(error);
        document.getElementById("ResponseText").style.color = "red";
        document.getElementById("ResponseText").innerHTML =
          "Error encountered while creating a University Application.";
      }
    });

  document
    .getElementById("contactNumber")
    .addEventListener("input", function () {
      const contactNumber = this.value;
      const pattern = /^0[6-8][0-9]{8}$/;

      if (!pattern.test(contactNumber)) {
        this.setCustomValidity(
          "Please enter a 10-digit phone number starting with 0, where the second digit is 6, 7, or 8"
        );
      } else {
        this.setCustomValidity("");
      }
    });
});

function showLoadingScreen() {
  document.getElementById("loading-screen").style.display = "block";
  document.getElementById("loading-video").style.display = "block";
}

function closeLoadingScreen() {
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("loading-video").style.display = "none";
}
