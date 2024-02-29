function createOptions(methodName, bodyMessage) {
  bodyTemp = methodName === "POST" ? body : null;
  const token = sessionStorage.getItem("token");
  return {
    method: methodName,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    bodyTemp: bodyMessage,
  };
}

async function fetchUnivesities(methodName, bodyMessage){
  const options = createOptions(methodName,bodyMessage);
  const response = await fetch(
    "http://localhost:5263/api/Admin/GetAllUniversityRequests",
    options
  );
  return await response.json();
}