let inputPlaceHolder = document.getElementById("fiboInput").value;
let outputPlaceHolder = document.getElementById("fiboOutput");
let largerPlaceHolder = document.getElementById("numLarger");
let networkError = document.getElementById("sr-only");

function fibo(x) { 
  let i = fiboArray.length;
  if (fiboArray[x-1]) {
      return(fiboArray[x-1]);
  }
      fiboArray.push(fiboArray[i-1]+fiboArray[i-2]);
      fibo(x);
}
let fiboArray = [0,1]

document.getElementById("myButton").addEventListener("click", function () {

  outputPlaceHolder.innerText = ""; 
  largerPlaceHolder.innerText = "";
  networkError.innerText = "";
  inputPlaceHolder = document.getElementById("fiboInput").value;

  if (inputPlaceHolder > 50) {
    largerPlaceHolder.innerText = "Can't be larger than 50";  
  }

  else {
    outputPlaceHolder.innerText = fibo(inputPlaceHolder);
    };

});