const dropzone = document.querySelector(".drop-zone");
const fileInput = document.querySelector(".fileInput");
const browsebtn = document.querySelector(".browse");
const bgProgress = document.querySelector(".bg-progress");
const progressBar = document.querySelector(".progress-bar");

const progressContainer = document.querySelector(".progress-container");

const percentDiv = document.querySelector("#percent");

const fileURLInput = document.querySelector("#fileURL");

const sharingContainer = document.querySelector(".sharing-container");

const copyBtn = document.querySelector("#copyBtn"); 

const host = "https://innshare.herokuapp.com/";
const uploadURL = `${host}api/files`;
// const uploadURL = `${host}api/files`;

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (dropzone.classList.add("dragged")) {
    dropzone.classList.add("dragged");
  }
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("dragged");
});

dropzone.addEventListener("drop", (f) => {
  f.preventDefault();
  dropzone.classList.remove("dragged");
  // console.log(f);
  const files = f.dataTransfer.files;
  // console.log(files);
  if (files.length) {
    fileInput.files = files;
    uplaodFile();
  }
});

fileInput.addEventListener("change", () => {
  uplaodFile();
});

browsebtn.addEventListener("click", () => {
  fileInput.click();
});

copyBtn.addEventListener("click", ()=>{
    fileURLInput.select();
    document.execCommand("copy");
});

const uplaodFile = () => {
    progressContainer.style.display = "block";
  const file = fileInput.files[0];
  const formData = new FormData();

  formData.append("myfile", file);

  const xhr = new XMLHttpRequest();
  //
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(xhr.response);
      showLink(JSON.parse(xhr.response));
    }
  };

  xhr.upload.onprogress = updateProgress;

  xhr.open("POST", uploadURL);
  xhr.send(formData);
};

const updateProgress = (e) => {
  const percentage = Math.round((e.loaded / e.total) * 100);
//   console.log(percentage);
  bgProgress.style.width = `${percentage}%`;
  percentDiv.innerText = percentage;
  progressBar.style.transform = `scaleX(${percentage}%)`
};

const showLink = ({file: url}) =>{
   console.log(url);
   progressContainer.style.display = "none"
   sharingContainer.style.display = "block"
   fileURLInput.value = url;
}
