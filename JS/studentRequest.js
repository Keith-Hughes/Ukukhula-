function createOptions(method, bodyMessage) {
    bodyTemp = method == "POST" ? body : null;

    return ({
        method: method,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,

        },
        bodyTemp: bodyMessage,

    });
    
}


document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("request-form");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        const FirstName = form.getElementById("firstName").value;
        const lastName = form.getElementById("lastName").value;
        const email = form.getElementById("email").value;
        const phoneNumber = form.getElementById("phoneNumber").value;
        const race = form.getElementById("race").value;
        const gender = form.getElementById("gender").value;
        const dob = form.getElementById("dob").value;
        const idNumber = form.getElementById("idNumber").value;
        const lastAveGrade = form.getElementById("lastAveGrade").value;
        const amount = form.getElementById("amount").value;
        //We need the university ID which we should 
        //find in session storage if the user is logged in
        fetch("http://localhost:5263/api/StudentFundRequest/")








    })
})