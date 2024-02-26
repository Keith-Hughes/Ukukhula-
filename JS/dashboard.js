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
