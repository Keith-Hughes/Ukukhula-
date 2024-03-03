async function fetchData(url, methodName = "GET", body = null) {
  const token = sessionStorage.getItem("token");
  const options = {
    method: methodName,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (methodName !== "GET" && body !== null) {
    options.body = JSON.stringify(body);
  }


    const response = await fetch(url, options);

    
    const data = await response.json();
    console.log(`data from fetch: ${data}`);
    return data;
}
