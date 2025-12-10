function handleDownloadResume(){
    const link = document.createElement("a");
    link.href = "/files/CV_Spatar_Sergiu_Razvan.pdf";   // path inside /public
    link.download = "CV_Spatar_Sergiu_Razvan.pdf"; 
    document.body.appendChild(link);
    link.click();
    link.remove();
}