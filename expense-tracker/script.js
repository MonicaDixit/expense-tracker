const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummy = [
  { id: 1, text: "flower", amount: -20 },
  { id: 2, text: "books", amount: -50 },
  { id: 3, text: "pay", amount: 1000 },
  { id: 4, text: "art", amount: 40 }
];

let transactions = dummy;

// add transaction to DOM

function addTransactionDOM(transaction) {
  // get the sign

  let sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text}<span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" 
    onclick="removeTransaction(${transaction.id})">x</button>

    `;

  list.appendChild(item);
}

function removeTransaction(id) {
  transactions = transactions.filter(ele => ele.id !== id);
  init();
}
// update the balance income and expense
function updateValues() {
  const amounts = transactions.map(ele => ele.amount);
  const total = amounts.reduce((acc, curr) => (acc += curr), 0).toFixed(2);

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter(amount => amount < 0)
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("add text or amount");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    text.value = "";
    amount.value = "";
  }
}

function generateId() {
  return Math.floor(Math.random() * 10000000);
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
