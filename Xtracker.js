//variables...

     const nameInput = 
document.getElementById("expenseName");

     const amountInput = 
document.getElementById("expenseAmount");

     const listInput = 
document.getElementById("ExpenseList");

      const exTotal = 
document.getElementById("totalExpense");

      const catergory = 
document.getElementById("catergory");

      const budget = 
document.getElementById("budget"); 

// later changes for variables...

      const form = 
document.getElementById("expenseForm");

      const form2 = 
document.getElementById("incomeForm");

      const descriptionInput =
document.getElementById("expenseDescription");

      const typeInput =
document.getElementById("expenseType");

      const list =
document.getElementById("type");

      const balance = 
document.getElementById("balance");

      const incomeE1 = 
document.getElementById("income-total"); 

      const expenseE1 = 
document.getElementById("expense-total");


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
    name: nameInput.value,
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
    name: nameInput.value,
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
list.addEventListener('change', function() {
  typeInput.value = list.value;
}     );


//function to update the UI
function updateUI() {
  let income = transactions.filter(t => t.type === "income");
  let expenses = transactions.filter(t => t.type === "expense");

  totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

  incomeE1.textContent = totalIncome;
  expenseE1.textContent = totalExpenses;
}
      balance.textContent = totalIncome - totalExpenses;
//function to save data to local storage
function saveData() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
//function to load data from local storage
function loadData() {
  const data = localStorage.getItem('transactions');  
      if (data) {
          transactions = JSON.parse(data);
          updateUI();
      }
}

//load data when the page loads
window.onload = loadData;     


//initial UI update
updateUI();

