// document.getElementById("populateFunds").addEventListener("click", () => {
//   // response = fetchData("http://localhost:5263/api/Admin/allocateBuget", "POST", {})
//   // if respo
// });

response = fetchData(config.apiUrl + "Admin/getBudgetAndFunds", "GET", {});

async function setData() {
  showLoadingScreen();

  response = await fetchData(
    config.apiUrl + "Admin/getBudgetAndFunds",
    "GET",
    {}
  );

  console.log(response);
  b = response["budget"];
  f = response["funds"];

  f = parseInt(b) - parseInt(f);
  const budget = b.toLocaleString("en-US", {
    style: "currency",
    currency: "ZAR",
  });
  const funds = f.toLocaleString("en-US", {
    style: "currency",
    currency: "ZAR",
  });
  document.getElementById("year").innerHTML = new Date().getFullYear();
  document.getElementById("BudgetDB").innerHTML = budget;
  document.getElementById("FundsDB").innerHTML = funds;
  document.getElementById("fundsSpent").innerHTML = response[
    "funds"
  ].toLocaleString("en-US", {
    style: "currency",
    currency: "ZAR",
  });

  closeLoadingScreen();
}

setData();
