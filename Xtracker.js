
//store transactions in local storage

let transactions = JSON.parse(localStorage.getItem("transactions")) || []; 



// Select elements
const expenseForm = document.getElementById("expense-form");
const incomeForm = document.getElementById("income-form");

const balanceDisplay = document.getElementById("main-balance");
const expenseTotalDisplay = document.getElementById("expense-total");
const incomeTotalDisplay = document.getElementById("income-total");

const summaryBalance = document.getElementById("summary-balance");
const summaryIncome = document.getElementById("summary-income");
const summaryExpense = document.getElementById("summary-expense");

const transactionList = document.getElementById("transactionList");

// Function to update summary
function updateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  const balance = income - expense;

  // Update UI
  balanceDisplay.textContent = `#${balance}`;
  expenseTotalDisplay.textContent = expense;
  incomeTotalDisplay.textContent = income;

  summaryBalance.textContent = `#${balance}`;
  summaryIncome.textContent = `#${income}`;
  summaryExpense.textContent = `#${expense}`;
}

// Function to render transactions
function renderTransactions() {
  transactionList.innerHTML = ""; // clear list

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add("transaction", 
      t.type);       // add classes
     
     // create text span
     const span =
    document.createElement("span");
      span.textContent = `${t.title} - #${t.amount}  (${t.type})` 

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "delete";
    delBtn.classList.add("delete-btn");
    delBtn.onclick = () => {
      transactions.splice(index, 1); // remove from array
      updateSummary();
      renderTransactions();
    };


    li.appendChild(span);
    li.appendChild(delBtn);
    
    transactionList.appendChild(li);
  });
}

// Handle expense form
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("expenseName").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const date = document.getElementById("expenseDate").value;
  const category = document.getElementById("expenseCategory").value;
  const recurrence = document.getElementById("expenseRecurrence").value;
  const notes = document.getElementById("expenseNotes").value;

  if (!title || isNaN(amount)) return;

  const expense = {
    type: "expense",
    title,
    amount,
    date,
    category,
    recurrence,
    notes,
  };

  transactions.push(expense);
  updateSummary();
  renderTransactions();
  expenseForm.reset();
});

// Handle income form
incomeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("income-description").value;
  const amount = parseFloat(document.getElementById("income-amount").value);
  const date = document.getElementById("incomeDate").value;
  const category = document.getElementById("incomeCategory").value;
  const recurrence = document.getElementById("incomeRecurrence").value;
  const notes = document.getElementById("incomeNotes").value;

  if (!title || isNaN(amount)) return;

  const income = {
    type: "income",
    title,
    amount,
    date,
    category,
    recurrence,
    notes,
  };

  transactions.push(income);
  updateSummary();
  renderTransactions();
  incomeForm.reset();
});


// Save to localStorage
function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initial render
updateSummary();
renderTransactions();
window.addEventListener("beforeunload", saveData);
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveData();
  }
});
window.addEventListener("pagehide", saveData);
window.addEventListener("unload", saveData);
window.addEventListener("blur", saveData);
window.addEventListener("focus", () => {
  // Reload data in case it changed in another tab
  transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  updateSummary();
  renderTransactions();
}
);

// Save data every minute
setInterval(saveData, 60000);

// Save data every 5 minutes
setInterval(saveData, 300000);
// Save data every 10 minutes
setInterval(saveData, 600000);  
// Save data every 30 minutes
setInterval(saveData, 1800000);
// Save data every hour
setInterval(saveData, 3600000); 


// editing transaction

let editingId = null;


// start editing a transaction

function startEditTransaction(id) {
  const tx = transactions.find(t => t.id === id);
  if (!tx) return;
  

//  
  if (tx.type === 'expense') {
    document.getElementById('expenseName').value = tx.title;
    document.getElementById('expenseAmount').value = tx.amount;
    document.getElementById('expense-form').dataset.editing = id;
  }
  else {
    document.getElementById('income-description').value = tx.title;
    document.getElementById('income-amount').value = tx.amount;
    document.getElementById('income-form').dataset.editing = id;  
  }

  editingId = id;
}

// modify form submit to handle edit mode

function handleFormSubmit(e, type) {
  e.preventDefault();

  if (editingId) {
    // update existing transaction
    const tx = transactions.find(t => t.id === editingId);
    if (tx) {
      if (type === 'expense') {
        tx.title = document.getElementById('expenseName').value;
        tx.amount = parseFloat(document.getElementById('expenseAmount').value);
      } else {
        tx.title = document.getElementById('income-description').value;
        tx.amount = parseFloat(document.getElementById('income-amount').value);
      }
    }
    editingId = null;
  } else {
    // normal add new transaction flow

    const transaction = {
      id: Date.now(), // simple unique id
      description: 
      type === 'expense' 
      ? document.getElementById('expenseName').value 
      : document.getElementById('income-description').value,
      amount: parseFloat(
        type === 'expense' 
        ? document.getElementById('expenseAmount').value 
        : document.getElementById('income-amount').value
      ),
      type,
    };
    transactions.push(transaction);
  }

  saveData();
  updateSummary();
  renderTransactions();
  e.target.reset();
}

// Add event listeners for forms
document
  .getElementById('expense-form')
  .addEventListener('submit', (e) => handleFormSubmit(e, 'expense'));


document
  .getElementById('income-form')
  .addEventListener('submit', (e) => handleFormSubmit(e, 'income'));

// Modify renderTransactions to add edit button

const editBtn = document.createElement('button');
editBtn.textContent = 'edit';
editBtn.addEventListener ("click", () => startEditTransaction(tx.id));
li.appendChild(editBtn);

transactionList.appendChild(li);

// End of Xtracker.js

// i --- IGNORE ---