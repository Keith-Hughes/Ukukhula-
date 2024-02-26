const JwToken = sessionStorage.getItem("token");
const role = sessionStorage.getItem("role");
let JsonToken;
if(JwToken){
    JsonToken = parseJwt(JwToken);
}

checkTokenValidity();
console.log(JsonToken);
async function  checkTokenValidity() {
    if (!JsonToken) {
        // Token is invalid or not present, redirect to login page

        window.location.href = "/unauthorized.html";
        
       

        
        return;
    }


    // Check if the role is valid 
    if (JsonToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== role) {
        console.log("role is not valid");
        console.log(JsonToken.role);
        console.log(role);
        // Redirect or handle unauthorized access
        window.location.href = "/unauthorized.html";
        return;
    }

    // Check token expiration 
    const currentTimestamp = Math.floor(Date.now() / 1000);
    console.log(currentTimestamp);
    console.log(JsonToken.exp);
    if (JsonToken.exp && JsonToken.exp < currentTimestamp) {
        // Token has expired, redirect to login page
        window.location.href = "/login.html";
        return;
    }
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}