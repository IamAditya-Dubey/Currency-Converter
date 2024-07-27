const BASE = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let btn = document.querySelector("button");
let msg = document.querySelector(".msg");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");

let dropdowns = document.querySelectorAll(".dropdown select");

for(let option of dropdowns){
for(currCode in countryList) {
  let newOption = document.createElement("option");
  newOption.innerText = currCode;
  newOption.value = currCode;
  if (option.name === "from" && currCode === "USD") {
    newOption.selected = true;
  } else if (option.name === "to" && currCode === "INR") {
    newOption.selected = true;
  }
  option.append(newOption);
}
option.addEventListener("change", (e) => {
  updateFlag(e.target);
})
}

let updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  console.log(countryCode);
  let srcUrl = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = srcUrl;
}

let exchangeRate = async() => {
  let input = document.querySelector("form .input input");
  let amount = input.value;
  if(input.value < 1) {
    input.value = 1;
  }
  let url = `${BASE}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  console.log(rate)
  let finalAmt = input.value * rate;
  let lastAmt = finalAmt.toFixed(2);
  msg.innerText = `${input.value} ${fromCurr.value} = ${lastAmt} ${toCurr.value}`;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  exchangeRate();
});

window.addEventListener("load", () => {
  exchangeRate();
})