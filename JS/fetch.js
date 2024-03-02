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

  try {
    const response = await fetch(url, options);


    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}
