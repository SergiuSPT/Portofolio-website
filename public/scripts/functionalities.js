function handleDownloadResume(){
    const link = document.createElement("a");
    link.href = "/files/CV_Spatar_Sergiu_Razvan.pdf";   // path inside /public
    link.download = "CV_Spatar_Sergiu_Razvan.pdf"; 
    document.body.appendChild(link);
    link.click();
    link.remove();
}

document.addEventListener("DOMContentLoaded", function () {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("sent") === "true") {
            const successModal = new bootstrap.Modal(document.getElementById("successModal"));
            successModal.show();
        }
    });