const dropzone = document.querySelector(".drop-zone")
const fileInput = document.querySelector(".fileInput")
const browsebtn = document.querySelector(".browse")

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    if(dropzone.classList.add("dragged")){
        dropzone.classList.add("dragged");
    }
});

dropzone.addEventListener("dragleave", () =>{
    dropzone.classList.remove("dragged");
});


dropzone.addEventListener("drop", (f) =>{
    f.preventDefault();
    dropzone.classList.remove("dragged");
    // console.log(f);
    const files = f.dataTransfer.files;
    console.log(files);
    if(files.length){
        fileInput.files = files;
    }
}); 

browsebtn.addEventListener("click", () => {
    fileInput.click();
});