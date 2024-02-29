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

async function fetchData(url,methodName, bodyMessage){
  const options = createOptions(methodName,bodyMessage);
  const response = await fetch(
    url,
    options
  );
  return await response.json();
}