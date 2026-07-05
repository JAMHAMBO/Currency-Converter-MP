let amount = document.querySelector("#amount");
let from = document.querySelector("#from");
let to = document.querySelector("#to");
let result = document.querySelector("#result");
let convertBtn = document.querySelector("#convertBtn");
let fromFlag = document.querySelector("#fromFlag")
let toFlag = document.querySelector("#toFlag");
let swap = document.querySelector(".swap");

for (let code in countryList) {
    let option1 = document.createElement("option");
    option1.value = code;
    option1.innerText = code;
    from.append(option1);

    let option2 = document.createElement("option");
    option2.value = code;
    option2.innerText = code;
    to.append(option2);
}

function updateFlag() {
    fromFlag.src = `https://flagsapi.com/${countryList[from.value]}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${countryList[to.value]}/flat/64.png`;
}

from.value = "INR";
to.value = "USD";
updateFlag()

to.addEventListener("change", () => {
    toFlag.src = `https://flagsapi.com/${countryList[to.value]}/flat/64.png`;
})

from.addEventListener("change", () => {
    fromFlag.src = `https://flagsapi.com/${countryList[from.value]}/flat/64.png`;
})

swap.addEventListener("click", () => {
    let temp = from.value;
    from.value = to.value;
    to.value = temp;
    updateFlag()
    result.value = ""
})

convertBtn.addEventListener("click", () => {
    let amt = Number(amount.value);

    if (amt <= 0 || isNaN(amt)) {
        result.value = "Enter a valid amount!";
        result.style.color = "red";

        return;
    }
    fetch(`https://open.er-api.com/v6/latest/${from.value}`)
        .then((response) => response.json())
        .then((data) => {
            result.value = (data.rates[to.value] * amt).toFixed(4);
        })
        .catch((error) => {
            result.value = "Error Occured!"
            result.style.color = "red";
        })
});



