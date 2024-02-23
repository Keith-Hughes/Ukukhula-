function redirect(){
    location.href = "university-request.html"
}

const applications = [
    {
      "university": "University of Toronto",
      "province": "Ontario",
      "amount":  5000,
      "status": "Approved",
      "dateCreated": "2024-02-23T12:19:20.676Z",
      "comment": "Excellent academic performance"
    },
    {
      "university": "McGill University",
      "province": "Quebec",
      "amount":  4000,
      "status": "Pending",
      "dateCreated": "2024-02-22T12:19:20.676Z",
      "comment": "Strong recommendation letters"
    },
    {
      "university": "University of British Columbia",
      "province": "British Columbia",
      "amount":  3000,
      "status": "Rejected",
      "dateCreated": "2024-02-21T12:19:20.676Z",
      "comment": "Needs improvement in essay"
    },
    {
      "university": "University of Alberta",
      "province": "Alberta",
      "amount":  2000,
      "status": "Approved",
      "dateCreated": "2024-02-20T12:19:20.676Z",
      "comment": "Highly qualified candidate"
    },
    {
      "university": "University of Saskatchewan",
      "province": "Saskatchewan",
      "amount":  1000,
      "status": "Pending",
      "dateCreated": "2024-02-19T12:19:20.676Z",
      "comment": "Good grades and work experience"
    }
  ];
  

function filterApplicationsByStatus(applications, status){
    return applications.filter(application=>application.status === status).map(({university,status})=>({id,university,status}))
}


document.addEventListener('DOMContentLoaded',function(){
    const tbody = document.querySelector(".UniversitY-request-table tbody");
    
})