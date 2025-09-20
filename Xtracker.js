//variables...

     const expenseForm = document.getElementById('expense-form');
const incomeForm = document.getElementById('income-form');

const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount'); // for expense
const categoryInput = document.getElementById('type');

const incomeDescriptionInput = document.getElementById('income-description');
const incomeAmountInput = document.getElementById('income-amount');
const incomeTypeInput = document.getElementById('income-type');

const list = document.getElementById('expenseList');

const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('Income-total');
const expenseEl = document.getElementById('Expense-total');

//strings...

let expenseName = "Food";
let anotherExpense = "Transport";
let entertainment = "Netflix";

let category = "Bills";

let message = "you added an expense: " + expenseName;

let fancyMessage = `You added ${expenseName} with catergory ${catergory}`;

let expenses =[];

let transactions = [];

//function...

//function to add an expense
function addExpense (name, amount, catergory) {
     let name = 
     document.getElementById("expenseName").value;

     let amount = parseFloat(document.getElementById("expenseAmount")).value;

     let catergory = 
     document.getElementById("expenseCatergory").value;

     if (!name || isNaN(amount)) {
        alert("Please enter a valid name and amount");
        return;
     }

         let expense = {name: name,
            amount: amount,
            category: catergory,
            date: new Date().toLocaleDateString()
      };

expenses.push(expense);   //save into the list 

renderExpenses();    //update the list display
updateTotal();         //update total

// clear inputs

document.getElementById("expenseName").value = "";
document.getElementById("expenseAmount").value = "";
document.getElementById("expenseCatergory").value = "Food";

}

//function to display all expenses

function renderExpenses(){
      let expenseList = document.getElementById("expenseList");
     expenseList.innerHTML = "";   //clear old list

     expenses.forEach((expense, index) => {
      let li = document.createElement("li");
      li.textContent = `${expense.name} - $$
      {expense.amount} [${expense.category}] (on ${expense.date})`;
         expenseList.appendChild(li);
     });
}

// function to calculate the total

function updateTotal() {
      let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      document.getElementById("totalAmount").textContent = total;
}


// How these functions fit your tracker:
//addExpense → takes the data from your input boxes and stores it.
//renderExpenses → shows everything in the list on screen.
//updateTotal → calculates and updates the total at the bottom.


// filter expenses by catergory 

function filterExpenses (){
      let selectedCatergory = 
      document.getElementById("filterCatergory").value;

      if (selectedCatergory === "All") {
            renderExpenses(expenses);
            
      } else {
            let filtered = expenses.filter(expense => expense.catergory === selectedCatergory);          
            renderExpenses(filtered);
      }
}


//event listener for form submission

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(), // unique ID
    description: descriptionInput.value,
    amount: parseFloat(amountInput.value),
    type: typeInput.value // "income" or "expense"
  };

  transactions.push(transaction);
  updateUI();
  saveData();

  // clear input fields
  descriptionInput.value = '';
  amountInput.value = '';
});

form2.addEventListener('submit', function(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(), // unique ID
    description: descriptionInput.value,
    amount: parseFloat(amountInput.value),
    type: typeInput.value // "income" or "expense"
  };

  transactions.push(transaction);
  updateUI();
  saveData();

  // clear input fields
  descriptionInput.value = '';
  amountInput.value = '';
});

// function to update the UI
function updateUI() {
  list.innerHTML = '';
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(tx => {
    const listItem = document.createElement('li');
    listItem.textContent = `${tx.description} - $${tx.amount} (${tx.type})`;
    list.appendChild(listItem);

    if (tx.type === 'income') {
      li.classList.add('income');
      totalIncome += tx.amount;
    } else {
      li.classList.add('expense');
      totalExpense += tx.amount;
    }

    listItem.classList.add(tx.type);

    listItem.addEventListener('click', () => {
      listItem.classList.toggle('highlight');
    });

    listItem.addEventListener('dblclick', () => {
      const newDescription = prompt('Edit description:', tx.description);
      if (newDescription) {
        tx.description = newDescription;
        updateUI();
      }
    });

    listItem.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const confirmDelete = confirm('Delete this transaction?');
      if (confirmDelete) {
        transactions = transactions.filter(tx => tx.id !== transaction.id);
        updateUI();
        saveData();
      }
    });

    // add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      transactions = transactions.filter(tx => tx.id !== transaction.id);
      updateUI();
      saveData();
    });
    listItem.appendChild(deleteBtn);
  });

  // update totals
  const balance = totalIncome - totalExpense;
  incomeE1.textContent = totalIncome;
  expenseE1.textContent = totalExpense;
  balance.textContent = balance;
}

//delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  updateUI();
  saveData();
}

// save data to local storage
function saveData() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// load data from local storage
function loadData() {
  const storedTransactions = localStorage.getItem('transactions');
  if (storedTransactions) {
    transactions = JSON.parse(storedTransactions);
    updateUI();
  }
}

// call loadData on page load
loadData();
