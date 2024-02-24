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

function loadSection(sectionName) {
  var sectionURL = sectionName.toLowerCase() + '.html';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              document.getElementById('main-content').innerHTML = xhr.responseText;
          } else {
              console.error('Error loading section:', xhr.status);
          }
      }
  };
  xhr.open('GET', sectionURL, true);
  xhr.send();
}
