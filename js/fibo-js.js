let outputPlaceHolder = document.getElementById("fiboOutput");
let largerPlaceHolder = document.getElementById("numLarger");
let networkError = document.getElementById("sr-only");

let one_place = document.getElementById("first");
let second_place = document.getElementById("second");
let third_place = document.getElementById("third");

let checked = document.getElementById("flexCheckDefault");

function fibo(x) { 
  i = fiboArray.length;
  if (fiboArray.length>x) {
      return(fiboArray[i-1]);
  }
      fiboArray.push(fiboArray[i-1]+fiboArray[i-2]);
      fibo(x);
}
let fiboArray = [0,1]
let i;

window.onload = function() {
  oldResults();
};

function compare( a, b ) {
  if ( a.createdDate < b.createdDate ){
    return -1;
  }
  if ( a.createdDate > b.createdDate ){
    return 1;
  }
  return 0;
}

serverError=false;
async function urlToData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw await response.text();
      }
      const data = await response.json();
      serverError = false;
      return data;
    }
    catch(errorText){ 
      serverError = true;
      return errorText;
    };
  }

async function oldResults() {

  let oldData = await urlToData(`http://localhost:5050/getFibonacciResults`);
  arrayLong = oldData.results.length - 1;

  (oldData.results).sort(compare);

  one_place.innerHTML=`<span>The Fibonacci of</span><span><b> ${oldData.results[arrayLong].number}</b></span><span> is</span><span><b> ${oldData.results[arrayLong].result}. </b></span><span>Calculated at:</span><span>${new Date(oldData.results[arrayLong].createdDate)}</span>`;
  second_place.innerHTML=`<span>The Fibonacci of</span><span><b> ${oldData.results[arrayLong-1].number}</b></span><span> is</span><span><b> ${oldData.results[arrayLong-1].result}. </b></span><span>Calculated at:</span><span>${new Date(oldData.results[arrayLong-1].createdDate)}</span>`;
  third_place.innerHTML=`<span>The Fibonacci of</span><span><b> ${oldData.results[arrayLong-2].number}</b></span><span> is</span><span><b> ${oldData.results[arrayLong-2].result}. </b></span><span>Calculated at:</span><span>${new Date(oldData.results[arrayLong-2].createdDate)}</span>`;
}


document.getElementById("myButton").addEventListener("click", async function () {

  outputPlaceHolder.innerText = ""; 
  largerPlaceHolder.innerText = "";
  document.getElementById("numLarger").classList.add("hidden"); 
  document.getElementById("fiboInput").classList.remove("redText"); 
  document.getElementById("fiboInput").classList.remove("btn-outline-danger");
  networkError.innerText = "";
  
  tempInput = document.getElementById("fiboInput").value;

  if (tempInput > 50) {
    document.getElementById("numLarger").classList.remove("hidden"); 
    document.getElementById("fiboInput").classList.add("redText");
    document.getElementById("fiboInput").classList.add("btn-outline-danger");
    largerPlaceHolder.innerText = "Can't be larger than 50";  
  }else if(tempInput<0) {
    document.getElementById("numLarger").classList.remove("hidden"); 
    document.getElementById("fiboInput").classList.add("redText");
    document.getElementById("fiboInput").classList.add("btn-outline-danger");
    largerPlaceHolder.innerText = "Can't be less than 0"; 
  }

  else {

    if(checked.checked){
      document.getElementById("spinnerChecking").classList.remove("d-none");
      serverAnswer = await urlToData(`http://localhost:5050/fibonacci/+${tempInput}`);

      if (serverError) {
        document.getElementById("spinnerChecking").classList.add("d-none");
        networkError.innerText = `Server Error: ${serverAnswer}`;
      }else { 
        document.getElementById("spinnerChecking").classList.add("d-none");
        outputPlaceHolder.innerText = serverAnswer.result;
      }

    }else{
      document.getElementById("spinnerChecking").classList.add("d-none");
      let demo = fibo(tempInput);
      outputPlaceHolder.innerText = fibo(tempInput);
    }
    
  oldResults();
}
});