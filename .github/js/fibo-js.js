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

let inputPlaceHolder = document.getElementById("fiboInput").value;

let outputPlaceHolder = document.getElementById("fiboOutput");

document.getElementById("myButton").addEventListener('click', function() {

  outputPlaceHolder.innerText = fibo(document.getElementById("fiboInput").value
  )
}
)

