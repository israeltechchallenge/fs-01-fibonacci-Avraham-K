let inputPlaceHolder = document.getElementById("fiboInput").value;
let outputPlaceHolder = document.getElementById("fiboOutput");
let largerPlaceHolder = document.getElementById("numLarger");
let networkError = document.getElementById("sr-only");

document.getElementById("myButton").addEventListener("click", function () {

  outputPlaceHolder.innerText = ""; 
  largerPlaceHolder.innerText = "";
  networkError.innerText = "";

  tempInput = document.getElementById("fiboInput").value;

  if (tempInput > 50) {
    largerPlaceHolder.innerText = "Can't be larger than 50";  
  }

  else {
    document.getElementById("spinnerChecking").classList.remove("d-none");
    fetch(`http://localhost:5050/fibonacci/+${tempInput}`).then((response) => {
    if (!response.ok) {
      document.getElementById("spinnerChecking").classList.add("d-none");
      networkError.innerText = "Server error: 42 is the meaning of life";
      return;
    }else {
      response.json().then((data) => {
      document.getElementById("spinnerChecking").classList.add("d-none");
      outputPlaceHolder.innerText = data.result;
    });
  }
  });
}
});