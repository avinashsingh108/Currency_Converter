const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll('select')
const from = document.querySelector('.from select')
const to = document.querySelector('.to select')
const result = document.querySelector('.result')
const btn = document.querySelector('.convert button')
const exchangeBtn = document.querySelector('.exchange button')


for (const select of dropdown)
{
    for (const code in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerHTML = code;    
        select.append(newOption)
    }    
    select.addEventListener('change', (e) => {
        updateFlag(e.target);
    })
}
from.value = "USD";
to.value = "INR";
window.addEventListener("load", () => {
    updateValue();
})
const updateValue = async () => {
    let amount = document.querySelector('.amount input')
    let amtVal = amount.value
    if (isNaN(amtVal) || amtVal <= 0) {
        result.innerHTML = "Please enter a valid number";
        return;
    }
    result.innerHTML = "Fetching data...";
    let url = `${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response = await fetch(url);
    if (!response.ok) {
        result.style.fontSize = "13px";
        result.innerHTML = "Error fetching exchange rates.<br>Please try again later.";
        return;
    }
    let data = await response.json();
    let rate = data[to.value.toLowerCase()]

    let finalAmout = (amtVal * rate).toFixed(3);
    result.innerHTML = `${amtVal} ${from.value} = ${finalAmout} ${to.value}`; 
}


const updateFlag = (element) => {
    let currCode = element.value;
    let conCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${conCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener('click', async (e) => {
    e.preventDefault();
    updateValue();
})

exchangeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const temp = from.value;
    from.value = to.value;
    to.value = temp;

    updateFlag(from);
    updateFlag(to);
    
    updateValue();
})