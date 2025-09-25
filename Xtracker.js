
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
  balanceDisplay.textContent = `₹${balance}`;
  expenseTotalDisplay.textContent = expense;
  incomeTotalDisplay.textContent = income;

  summaryBalance.textContent = `₹${balance}`;
  summaryIncome.textContent = `₹${income}`;
  summaryExpense.textContent = `₹${expense}`;
}

// Function to render transactions
function renderTransactions() {
  transactionList.innerHTML = ""; // clear list

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.textContent = `${t.title} - ₹${t.amount} (${t.type})`;
    li.style.color = t.type === "income" ? "green" : "red";

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "delete";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = () => {
      transactions.splice(index, 1); // remove from array
      updateSummary();
      renderTransactions();
    };

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


// editing transactions

let editingId = null;

function startEditTransaction(index) {
  const tx = transactions.find((t, i) => i === index);
  if (!tx) return;
  editingId = index;

  if (tx.type === "expense") {
    document.getElementById("expenseName").value = tx.title;
    document.getElementById("expenseAmount").value = tx.amount;
    document.getElementById("expenseDate").value = tx.date;
    document.getElementById("expenseCategory").value = tx.category;
    document.getElementById("expenseRecurrence").value = tx.recurrence;
    document.getElementById("expenseNotes").value = tx.notes;
    document.getElementById("expense-submit-btn").textContent = "Update Expense";
  } else {
    document.getElementById("income-description").value = tx.title;
    document.getElementById("income-amount").value = tx.amount;
    document.getElementById("incomeDate").value = tx.date;
    document.getElementById("incomeCategory").value = tx.category;
    document.getElementById("incomeRecurrence").value = tx.recurrence;
    document.getElementById("incomeNotes").value = tx.notes;
    document.getElementById("income-submit-btn").textContent = "Update Income";
  }

  editingId = index;
  showTab(tx.type === "income" ? "income" : "expense");
}
function showTab(tab) {
  if (tab === "income") {
    document.getElementById("income-form").style.display = "block";
    document.getElementById("expense-form").style.display = "none";
  } else {
    document.getElementById("income-form").style.display = "none";
    document.getElementById("expense-form").style.display = "block";
  }
  editingId = null;
  document.getElementById("income-submit-btn").textContent = "Add Income";
  document.getElementById("expense-submit-btn").textContent = "Add Expense";
}
document.getElementById("income-tab").onclick = () => showTab("income");
document.getElementById("expense-tab").onclick = () => showTab("expense");
showTab("expense");

// Modify form submit handlers to handle editing
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
  if (editingId !== null) {
    transactions[editingId] = expense;
    editingId = null;
    document.getElementById("expense-submit-btn").textContent = "Add Expense";
  } else {
    transactions.push(expense);
  }
  updateSummary();
  renderTransactions();
  expenseForm.reset();
}
);

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
  if (editingId !== null) {
    transactions[editingId] = income;
    editingId = null;
    document.getElementById("income-submit-btn").textContent = "Add Income";
  } else {
    transactions.push(income);
  } 
  updateSummary();
  renderTransactions();
  incomeForm.reset();
});

// Modify renderTransactions to add edit buttons
function renderTransactions() {
  transactionList.innerHTML = ""; // clear list 
  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.textContent = `${t.title} - ₹${t.amount} (${t.type})`;
    li.style.color = t.type === "income" ? "green" : "red";
    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.style.marginLeft = "10px";
    



