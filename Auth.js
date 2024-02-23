// initialize the OAuth app.
OAuth.initialize('CMe8Uc8Zy9TY3s1MX9R1_PC4TsA');


  function createOptions(method, bodyMessage) {
    bodyTemp = method == "POST" ? body : null;
    return (authenticatedPostOptions = {
      method: method,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
   
      },
      bodyTemp: bodyMessage,
    });
  }
 
function LoginFunction(event){
    event.preventDefault();
    console.log('button clicked');
    OAuth.popup('google').done(function(result) {
        console.log("pop up");
        //make API calls with `google`
        // console.log(JSON.stringify(result));
        result.me().done(function(data) {
            const email = data.raw.email;
            console.log(email);
            const requestData = {
                Email: email
              };
              const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
              };
            let jsonResponse = {}
            //check if email is in our database.
            fetch("http://localhost:5263/api/Auth/Login", options)
            .then( response => response.json())
            .then(data => checkResponse(data));

        });
      }).fail(function(err) {
        //todo when the OAuth flow failed
      });
    
    
       
      
    
} 

function checkResponse(responseData){
    if(responseData.isSuccess == false){
        alert(responseData.message);
    }
    else{
        
        sessionStorage.setItem("userId", responseData.Id);
        sessionStorage.setItem("token", responseData.message);
        sessionStorage.setItem("role", responseData.Role);
        
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    googleButton = document.getElementById("google-login");

    googleButton.addEventListener("click", event => LoginFunction(event))

   







    // LoginForm.addEventListener("submit",event => LoginFunction(event));

    // const getBtn = document.getElementById("unis")

    // getBtn.addEventListener("click",async()=>{
    //     const dataResponse2 = await response.json();
    //     const sec = document.getElementById("unis2");
    //     sec.innerHTML =  JSON.stringify(dataResponse2[0]);
    // });


} );
