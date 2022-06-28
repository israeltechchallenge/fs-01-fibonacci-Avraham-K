let outputPlaceHolder = document.getElementById("fiboOutput");
let largerPlaceHolder = document.getElementById("numLarger");
let networkError = document.getElementById("sr-only");

let one_place = document.getElementById("first");
let second_place = document.getElementById("second");
let third_place = document.getElementById("third");

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

function oldResults() {
  fetch(`http://localhost:5050/getFibonacciResults`)
  .then((response) => response.json().then((oldData) => {
  arrayLong = oldData.results.length - 1;

  (oldData.results).sort(compare);

  // one_place.innerText = `The Fibonacci of ${oldData.results[arrayLong].number} is ${oldData.results[arrayLong].result}. Calculated at:  ${new Date(oldData.results[arrayLong].createdDate)}`;
  // second_place.innerText = `The Fibonacci of ${oldData.results[arrayLong-1].number} is ${oldData.results[arrayLong-1].result}. Calculated at:  ${new Date(oldData.results[arrayLong-1].createdDate)}`;
  // third_place.innerText = `The Fibonacci of ${oldData.results[arrayLong-2].number} is ${oldData.results[arrayLong-2].result}. Calculated at:  ${new Date(oldData.results[arrayLong-2].createdDate)}`;
  
  one_place.innerHTML=`<span>The Fibonacci of</span><span><b> ${oldData.results[arrayLong].number}</b></span><span> is</span><span><b> ${oldData.results[arrayLong].result}. </b></span><span>Calculated at:</span><span>${new Date(oldData.results[arrayLong].createdDate)}</span>`;
  second_place.innerHTML=`<span>The Fibonacci of</span><span><b> ${oldData.results[arrayLong-1].number}</b></span><span> is</span><span><b> ${oldData.results[arrayLong-1].result}. </b></span><span>Calculated at:</span><span>${new Date(oldData.results[arrayLong-1].createdDate)}</span>`;
  third_place.innerHTML=`<span>The Fibonacci of</span><span><b> ${oldData.results[arrayLong-2].number}</b></span><span> is</span><span><b> ${oldData.results[arrayLong-2].result}. </b></span><span>Calculated at:</span><span>${new Date(oldData.results[arrayLong-2].createdDate)}</span>`;
}
))
}

document.getElementById("myButton").addEventListener("click", function () {

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
  }

  else {
    document.getElementById("spinnerChecking").classList.remove("d-none");
    fetch(`http://localhost:5050/fibonacci/+${tempInput}`).then((response) => {

    if (!response.ok) {
      response.text().then((errtext) => {
      document.getElementById("spinnerChecking").classList.add("d-none");
      networkError.innerText = `Server Error: ${errtext}`;
      return;
      })

    }else { 
      response.json().then((data) => {
      document.getElementById("spinnerChecking").classList.add("d-none");
      outputPlaceHolder.innerText = data.result;
    });
  }

  });

  oldResults();
}

});