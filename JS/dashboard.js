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

function loadPage(page) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => (document.getElementById(content).innerHTML = data))
    .catch((error) => console.error("Error:", error));
}
