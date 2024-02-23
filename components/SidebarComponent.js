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
  
class Sidebar extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <style>
        .toggle-btn {
            position: fixed;
            left: 0px;
            top: 20px;
            width: 40px;
            height: 40px;
            margin: 0% 1%;
            background-color: #333;
            color: white;
            border: none;
            outline: none;
            cursor: pointer;
          }
        
          .hamburger {
            width: 20px;
            height: 2px;
            background-color: white;
            position: relative;
            display: block;
            margin: 19px auto;
            transition: 0.3s;
          }
        
          .hamburger::before,
          .hamburger::after {
            content: "";
            width: 20px;
            height: 2px;
            background-color: white;
            position: absolute;
            left: 0;
            transition: 0.3s;
          }
        
          .hamburger::before {
            top: -6px;
          }
        
          .hamburger::after {
            bottom: -6px;
          }
        
          .toggle-btn.active {
            background-color: black;
          }
        
          .toggle-btn.active .hamburger {
            background-color: white;
          }
        
          .toggle-btn.active .hamburger::before {
            top: 0;
            transform: rotate(45deg);
          }
        
          .toggle-btn.active .hamburger::after {
            bottom: 0;
            transform: rotate(-45deg);
          }
        
          .sidebar.active {
            background-color: black;
            width: 250px;
            margin: 0% 1%;
          }
        
          @media (max-width: 768px) {
            .sidebar {
              width: 0;
            }
        
            .toggle-btn {
              left: 0;
            }
          }
        </style>
        <nav class="sidebar">
        <h1>Ukukhula Dashboard</h1>
        <ul>
          <li>
            <a href="#"><i class="uil uil-estate"></i>Home</a>
          </li>
          <li>
            <a href="#Universities"
              ><i class="uil uil-files-landscapes"></i>Universities</a
            >
          </li>
          <li>
            <a href="#UniversityRequest"
              ><i class="uil uil-chart"></i>University Request</a
            >
          </li>
          <li>
            <a href="#StudentRequest"
              ><i class="uil uil-thumbs-up"></i>Student Request</a
            >
          </li>
          <li>
            <a href="#"><i class="uil uil-comments"></i>Comment</a>
          </li>
          <li>
            <a href="#Funds"><i class="uil uil-share"></i>Funds</a>
          </li>
          <li>
            <a href="#"><i class="uil uil-signout"></i>Logout</a>
          </li>
        </ul>
      </nav>
        `
    }
}
costumElements.define('sidebar-component', Sidebar);