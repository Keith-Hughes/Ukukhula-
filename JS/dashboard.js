document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".toggle-btn");

  // add click event listener to the button
  toggleBtn.addEventListener("click", function () {
    // toggle the active class on the button and the sidebar
    toggleBtn.classList.toggle("active");
    sidebar.classList.toggle("active");
  });
});

function showLogoutMessage() {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".toggle-btn").classList.toggle("active");
  // Create a div element for the message
  document.getElementById("overlay").style.display = "block";

  var logoutMessage = document.createElement("div");
  logoutMessage.id = "logout-message";
  logoutMessage.innerHTML =
    '<p>Do you want to log out?</p><button id="agree" onclick="logout()">Yes</button><button onclick="closeLogoutMessage()" id="disagree">No</button>';

  // Append the message to the body
  document.body.appendChild(logoutMessage);
}

function logout() {
  sessionStorage.clear();
  location.href = "/index.html";
}

function closeLogoutMessage() {
  var logoutMessage = document.getElementById("logout-message");
  logoutMessage.parentNode.removeChild(logoutMessage);
  document.getElementById("overlay").style.display = "none";
}

function loadSection(sectionName) {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".toggle-btn").classList.toggle("active");
  var sectionURL = sectionName.toLowerCase() + ".html";
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
  switch (sectionName) {
    case "UniversityRequest":
      scriptPaths = ["/JS/universities.js"];
      loadScripts(scriptPaths);
      break;
    case "StudentRequest":
      scriptPaths = ["/JS/studentRequest.js"];
      loadScripts(scriptPaths);
      break;
    case "Universities":
      scriptPaths = ["/JS/AllUniversities.js"];
      loadScripts(scriptPaths);
      break;
  }
}

function loadScripts(scriptPaths) {
  scriptPaths.forEach(function (scriptPath) {
    var script = document.createElement("script");
    script.src = scriptPath;
    script.type = "text/javascript";
    document.body.appendChild(script);
  });
}
