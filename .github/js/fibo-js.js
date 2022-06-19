function fibo(num) {
  if(num <= 1) {
    return num;
  }
  
  let result = [0, 1];

  for (let i = 2; i <= num; i++) {
    result[i] = result[i - 2] + result[i - 1];
  }

  return result[result.length - 1];
}

let inputPlaceHolder = document.getElementById("input");
let outputPlaceHolder = document.getElementById("output");

inputPlaceHolder.innerText = 10;
outputPlaceHolder.innerText = fibo(inputPlaceHolder.innerText);
