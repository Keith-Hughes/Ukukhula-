async function checkToken() {
    // Create a URL object using the current page's URL
    const url = new URL(window.location.href);

    // Access query parameters
    
    const fullName = url.searchParams.get('fullName');
    const requestID = url.searchParams.get('requestID');
    const token = url.searchParams.get('token');
    if(!token || !requestID){
        window.location.replace('../unauthorized');
    }
    else{
        const tokenResponse = await fetch(`${config.apiUrl}Token/validate/${token}`);
        if(tokenResponse.ok){
            displayDocumentButtons(requestID);
            const tokenData = await tokenResponse.json();
            if(tokenData.isTokenExpired){
                window.location.replace('../unauthorized');
            }
        }
        document.getElementById("student-name").innerText = fullName
        return requestID;
    }
}

document.addEventListener('DOMContentLoaded',async function(){
    const requestId = await checkToken();
    document.getElementById("document-form").addEventListener('submit',async function(event){
        event.preventDefault();
        const cvFile = document.getElementById("cv").files[0];
        const transcriptFile = document.getElementById("transcript").files[0];
        const idDocumentFile = document.getElementById("idDocument").files[0];

        const documentsFormData = new FormData();

        if (cvFile) {
            documentsFormData.append("CV", cvFile);
        }

        if (transcriptFile) {
            documentsFormData.append("Transcript", transcriptFile);
        }

        if (idDocumentFile) {
            documentsFormData.append("IDDocument", idDocumentFile);
        }

        if(cvFile || transcriptFile || idDocumentFile){
            showLoadingScreen();
            const response = await fetch(`${config.apiUrl}UploadDocument/${requestId}/upload`, {
            method: "POST",
            body: documentsFormData,

            });
            closeLoadingScreen();
        if(response.ok){
            
            const responseModal = document.getElementById('popup-content');
            responseModal.style.display = "block";
          
            setTimeout(() => {
              responseModal.style.display = "none";
              window.location.replace('../');
            }, 5000);
            //popup and redirect to landing page

        };
    };
    });
});

async function displayDocumentButtons(requestId){
    const cvBtn = document.getElementById("cv");
    const transcriptBtn = document.getElementById("transcript");
    const idBtn = document.getElementById("idDocument");
    //hide all buttons by default
    cvBtn.disabled = true;
    transcriptBtn.disabled = true;
    idBtn.disabled = true;
    showLoadingScreen();
    const cvData = await fetch(config.apiUrl+"UploadDocument/get/"+requestId+"/cv");
    if(!cvData.ok){
      cvBtn.disabled = false;
    }
    
    const trancriptData = await fetch(config.apiUrl+"UploadDocument/get/"+requestId+"/transcript");
    if(!trancriptData.ok){
      transcriptBtn.disabled = false;
    }
    
    const idData = await fetch(config.apiUrl+"UploadDocument/get/"+requestId+"/IDDocument");
      if(!idData.ok){
        idBtn.disabled = false;
    }
    closeLoadingScreen();
  }