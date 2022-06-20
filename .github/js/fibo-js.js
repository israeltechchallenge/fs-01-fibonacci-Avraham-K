let inputPlaceHolder = document.getElementById("fiboInput").value;

let outputPlaceHolder = document.getElementById("fiboOutput");

document.getElementById("myButton").addEventListener("click", function () {
  tempInput = document.getElementById("fiboInput").value;

  fetch(`http://localhost:5050/fibonacci/+${tempInput}`).then((response) => {
    response.json().then((data) => {
      outputPlaceHolder.innerText = data.result;
    });
  });
});
