const dropzone = document.querySelector(".drop-zone")
const fileInput = document.querySelector(".fileInput")
const browsebtn = document.querySelector(".browse")

const host = "https://innshare.herokuapp.com/";
const uploadURL = `${host}api/files`;
// const uploadURL = `${host}api/files`;


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
    // console.log(files);
    if(files.length){
        fileInput.files = files;
        uplaodFile();
    }
}); 


fileInput.addEventListener("change", () => {
    uplaodFile();
})

browsebtn.addEventListener("click", () => {
    fileInput.click();
});

const uplaodFile = () => {

    const file = fileInput.files[0];
    const formData =  new FormData();

    formData.append("myfile",file);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
       if(xhr.readyState === XMLHttpRequest.DONE){
        console.log(xhr.response);
       }
    }; 

    xhr.open("POST",uploadURL);
    xhr.send(formData);
};