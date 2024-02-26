function createOptions(methodName, bodyMessage) {
    bodyTemp = methodName === "POST" ? body : null;
    return ({
        method: methodName,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,

        },
        bodyTemp: bodyMessage,

    });
    
}

document.addEventListener("DOMContentLoaded",()=> {
    
})