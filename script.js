const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const invert = document.getElementById("invert");

function calculate() {
  const currencyOneVal = currencyOne.value;
  const currencyTwoVal = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneVal}`)
    .then((res) => res.json())
    .then((data) => {
      const conversionRate = data.rates[currencyTwoVal];
      rate.innerText = `1 ${currencyOneVal} = ${conversionRate} ${currencyTwoVal}`;
      amountTwo.value = (amountOne.value * conversionRate).toFixed(2);
    });
}

// Event listeners
currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

invert.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

calculate();
