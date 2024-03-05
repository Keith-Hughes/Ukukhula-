async function fillChart() {
  showLoadingScreen();

  response = await fetchData(
    config.apiUrl + "Admin/getBudgetAndFunds",
    "GET",
    {}
  );

  const totalMoney = parseInt(response["budget"]);
  const moneySpent = parseInt(response["funds"]);

  const moneyLeft = totalMoney - moneySpent;

  //   let data = {
  //     labels: ["Money Spent", "Money Left"],
  //     datasets: [
  //       {
  //         data: [moneySpent, moneyLeft],
  //         backgroundColor: ["red", "white"], // Red for money spent, Blue for money left
  //         hoverBackgroundColor: ["red", "white"],
  //       },
  //     ],
  //     };

  var pieData = {
    labels: ["Funds Allocated", "Funds Remaining"],
    datasets: [
      {
        data: [moneySpent, moneyLeft],
        backgroundColor: ["red", "white"], // Red for money spent, Blue for money left
        hoverBackgroundColor: ["red", "white"],
      },
    ],
  };

  var pieOptions = {
    responsive: true,
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Money Spent vs Money Left",
    },
    elements: {
      arc: {
        borderColor: "black", // Outline color
      },
    },
  };

  var ctxPie = document.getElementById("myPieChart").getContext("2d");
  var pieChart = new Chart(ctxPie, {
    type: "pie",
    data: pieData,
    options: pieOptions,
  });

  closeLoadingScreen();
}

document.addEventListener("DOMContentLoaded", function () {
  fillChart();
});
