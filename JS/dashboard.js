document.addEventListener("DOMContentLoaded", () => {
  checkTokenValidity();
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".toggle-btn");

  // add click event listener to the button
  toggleBtn.addEventListener("click", function () {
    // toggle the active class on the button and the sidebar
    toggleBtn.classList.toggle("active");
    sidebar.classList.toggle("active");

    const mainElements = document.getElementsByTagName("main");

    // Loop through each main element
    for (let i = 0; i < mainElements.length; i++) {
      const mainElement = mainElements[i];

      // Toggle the 'mainChanged' class based on the state of the toggle button
      if (!toggleBtn.classList.contains("active")) {
        mainElement.classList.add("mainChanged");
      } else {
        mainElement.classList.remove("mainChanged");
      }
    }
  });
});

function showLogoutMessage() {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".toggle-btn").classList.toggle("active");
  // Create a div element for the message
  document.getElementById("overlay").style.display = "block";

  var logoutMessage = document.createElement("span");
  logoutMessage.id = "logout-message";
  logoutMessage.innerHTML =
    '<p>Do you want to log out? <br><br></p><button id="agree" onclick="logout()">Yes</button><button onclick="closeLogoutMessage()" id="disagree">No</button>';

  // Append the message to the body
  document.body.appendChild(logoutMessage);
}

function logout() {
  sessionStorage.clear();
  location.href = "../";
}

function closeLogoutMessage() {
  var logoutMessage = document.getElementById("logout-message");
  logoutMessage.parentNode.removeChild(logoutMessage);
  document.getElementById("overlay").style.display = "none";
}

function toggleSubMenu(id) {
  const subMenu = document.getElementById(id);
  if (subMenu.style.display === "none") {
    subMenu.style.display = "block";
  } else {
    subMenu.style.display = "none";
  }
}

function loadSection(sectionName) {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".toggle-btn").classList.toggle("active");
  const subMenu = document.getElementById("sub-menu");
  if (subMenu != null) {
    subMenu.style.display = "none";
  }
  const mainElements = document.getElementsByTagName("main");

  for (let i = 0; i < mainElements.length; i++) {
    const mainElement = mainElements[i];

    if (!document.querySelector(".toggle-btn").classList.contains("active")) {
      mainElement.classList.add("mainChanged");
    } else {
      mainElement.classList.remove("mainChanged");
    }
  }
  var sectionURL = "./" + sectionName + ".html";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        document.getElementById("main-content").innerHTML = xhr.responseText;
        loadScriptsBySection(sectionName);
      } else {
        console.error("Error loading section:", xhr.status);
      }
    }
  };
  xhr.open("GET", sectionURL, true);
  xhr.send();
}

function loadScriptsBySection(sectionName) {
  let scriptPaths = [];
  switch (sectionName) {
    case "UniversityRequest":
      scriptPaths = ["../JS/universities.js"];
      break;
    case "StudentRequest":
      scriptPaths = ["../JS/studentRequest.js", "../JS/html2pdf.bundle.min.js"];

      break;
    case "Universities":
      scriptPaths = ["../JS/AllUniversities.js"];
      break;
    case "ManageUsers":
      scriptPaths = ["../JS/ManageUsers.js"];
      break;
    case "Funds":
      scriptPaths = ["../JS/Funds.js"];
      break;
    case "PopulateFunds":
      scriptPaths = ["../JS/PopulateFunds.js"];
      break;
    case "StudentRequestUniversity":
      scriptPaths = [
        "../JS/universityStudentRequest.js",
        "../JS/html2pdf.bundle.min.js",
      ];
      break;
    case "FundByUniversity":
      scriptPaths = ["../JS/FundByUniversity.js"];
      break;
      case "UniversityFunds":
        scriptPaths = ["../JS/UniversityFunds.js"];
        break;
    
  }
  loadScripts(scriptPaths);
}

function loadScripts(scriptPaths) {
  //Load the AuthService script before all other scripts

  checkTokenValidity();
  scriptPaths.forEach(function (scriptPath) {
    script = document.createElement("script");
    script.src = scriptPath;
    script.type = "text/javascript";
    document.body.appendChild(script);
  });
}

function showLoadingScreen() {
  document.getElementById("loading-screen").style.display = "block";
  document.getElementById("loading-video").style.display = "block";
}

function closeLoadingScreen() {
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("loading-video").style.display = "none";
}
