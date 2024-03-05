function validateDate() {
    // Get the selected date from the input
    const selectedDate = new Date(document.getElementById("dob").value);
  
    // Calculate the maximum allowed birth date for a person not older than 35
    const maxBirthDate = new Date();
    const minBirthDate = new Date();
    maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 35);
    minBirthDate.setFullYear(minBirthDate.getFullYear() -18);
    console.log(maxBirthDate);
    console.log(selectedDate);
    console.log(minBirthDate)
    // Check if the selected date is within the allowed range
    if (selectedDate < maxBirthDate) {
        alert("Person must be 35 years or younger.");
        // Clear the selected date or take appropriate action
        document.getElementById("dob").value = "";
    }
    if(selectedDate>=minBirthDate){
        alert("Person must be 18 years or older");
        document.getElementById("dob").value = "";
    }
}

function isValidSAID() {
    let id = document.getElementById("idNumber-request").value;
        var i, c,
            even = '',
            sum = 0,
            check = id.slice(-1);

        if (id.length != 13 || id.match(/\D/)) {
            document.getElementById("idNumber-request").value ="";
            alert('Your South African ID is not valid.');
            return false;
        }
        id = id.substr(0, id.length - 1);
        for (i = 0; c = id.charAt(i); i += 2) {
            sum += +c;
            even += id.charAt(i + 1);
        }
        even = '' + even * 2;
        for (i = 0; c = even.charAt(i); i++) {
            sum += +c;
        }
        sum = 10 - ('' + sum).charAt(1);
        if (('' + sum).slice(-1) != check) {
            document.getElementById("idNumber-request").value ="";
            alert('Your South African ID is not valid.');
            return false
        }
        id = document.getElementById("idNumber-request").value;
        const yearPrefix = id.charAt(0) === '0' ? '20' : '19';
        const year = yearPrefix + id.substring(0, 2);
        const month = id.substring(2, 4);
        const day = id.substring(4, 6);
        const genderCode = parseInt(id.substring(6, 10), 10);
        const citizenshipStatus = id.charAt(10);
    
        const gender = genderCode < 5000 ? 'Female' : 'Male';
        const citizenStatus = citizenshipStatus === '0' ? 'SA Citizen' : 'Permanent Resident';
        console.log(citizenStatus);
        console.log(gender);
        // Populate the corresponding input fields
        document.getElementById("dob").valueAsDate = new Date(`${year}-${month}-${day}`);
        const genderSelect = document.getElementById("genderName");
        for (let option of genderSelect.options) {
            if (option.value === gender) {
                option.selected = true;
            }
        }
    
        // Populate the corresponding input fields
      
    }

    // This part is not needed anymore as the validation is now done inside the isValidSAID function.
    // if (!isValidSAID(document.getElementById('id').innerHTML)) {
    //     alert('Your South African ID is not valid.');
    // }