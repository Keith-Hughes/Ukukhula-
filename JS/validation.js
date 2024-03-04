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