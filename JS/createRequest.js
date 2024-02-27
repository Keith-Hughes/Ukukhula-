function createOptions(methodName, bodyMessage) {
    bodyTemp = methodName === "POST" ? body : null;
    return {
      method: methodName,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      bodyTemp: bodyMessage,
    };
  }

document.addEventListener("DOMContentLoaded", function (event) {
  document
    .getElementById("request-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      //We need the university ID which we should
      //find in session storage if the user is logged in
      const UniversitId = parseInt(sessionStorage.getItem("universityId"));
      console.log(UniversitId);
      const requestData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        raceName: document.getElementById("race").value,
        genderName: document.getElementById("gender").value,
        birthDate: document.getElementById("dob").value,
        idNumber: document.getElementById("idNumber").value,
        grade: parseInt(document.getElementById("lastAveGrade").value),
        amount: parseInt(document.getElementById("amount").value),

        universityID: UniversitId,
      };

      const options = createOptions("POST", JSON.stringify(requestData));
      fetch("http://localhost:5263/api/StudentFundRequest/create", options)
        .then((respons) => respons.json())
        .then((data) => window.alert(data.message));
    });
});
