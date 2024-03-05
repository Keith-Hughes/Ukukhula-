function createOptions(methodName) {
  return {
    method: methodName,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
}

async function getFunds() {
  showLoadingScreen();
  let universitiesDict = {};
  const universitiesObject = await fetch(
    config.apiUrl + "Admin/GetAllUniversities",
    createOptions("GET")
  );
  const universities = await universitiesObject.json();

  for (let i = 0; i < universities.length; i++) {
    universitiesDict[universities[i]["id"]] = universities[i]["name"];
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  const UniversityID = sessionStorage.getItem("universityId");

  const universityAllocationsObject = await fetch(
    config.apiUrl + "Admin/GetUniversityAllocationsByYear",
    createOptions("GET", {})
  );

  const universityAllocations = await universityAllocationsObject.json();
  let universityAllocation = {};
  console.log(universitiesDict[UniversityID]);
  for (let i = 0; i < universityAllocations.length; i++) {
    console.log(universityAllocations[i]["university"]);
    if (
      universityAllocations[i]["university"] == universitiesDict[UniversityID]
    ) {
      universityAllocation = universityAllocations[i];
    }
  }
  console.log(universityAllocation);
  if (universityAllocation == {}) {
  } else {
    const Budget = universityAllocation["budget"];
    const totalAllocated = universityAllocation["totalAllocated"];

    document.getElementById("BudgetDBUniversity").innerText =
      Budget.toLocaleString("en-US", {
        style: "currency",
        currency: "ZAR",
      });
    document.getElementById("fundsSpentUniversity").innerText =
      totalAllocated.toLocaleString("en-US", {
        style: "currency",
        currency: "ZAR",
      });
    document.getElementById("FundsDBUniversity").innerText = (
      parseInt(Budget) - parseInt(totalAllocated)
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "ZAR",
    });

    document.getElementById("year").innerText = new Date().getFullYear();
  }

  closeLoadingScreen();
}

getFunds();
