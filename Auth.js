

  function createOptions(method, bodyMessage){
    bodyTemp = (method=="POST"? body: null);
    return authenticatedPostOptions = {
        method: method,  // Adjust the method as needed
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("jwtToken")}`,
          // Other headers as needed
        },
        bodyTemp:  bodyMessage
      };
  }
 
async  function LoginFunction(event){
    event.preventDefault();

    const data ={Email : document.getElementById("email").value ,Password:document.getElementById("password").value}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
        const response = await fetch("http://localhost:5263/api/Auth/Login", options);
        const dataResponse = await response.json();
        // Check if the response status is in the range 200-299 (indicating success)
        if (response.ok) {
            sessionStorage.setItem('jwtToken', dataResponse.message);
          console.log(dataResponse.message); // Handle the JSON data as needed
        } else {
          console.error(`HTTP error! Status: ${dataResponse.message}`);
        }
      
    
} 


document.addEventListener("DOMContentLoaded", () =>{
    const LoginForm =document.getElementById("login-form")

    

    LoginForm.addEventListener("submit",event => LoginFunction(event));

    const getBtn = document.getElementById("unis")

    getBtn.addEventListener("click",async()=>{
        const options = createOptions('GET',{});

        const response = await fetch("http://localhost:5263/Admin/GetUniversityAllocationsByYear", options);
        const dataResponse2 = await response.json();
        const sec = document.getElementById("unis2");
        sec.innerHTML =  JSON.stringify(dataResponse2[0]);
    })


} );
