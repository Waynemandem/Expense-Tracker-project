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


//strings...

let expenseName = "Food";
let anotherExpense = "Transport";
let entertainment = "Netflix";

let category = "Bills";

let message = "you added an expense: " + expenseName;

let fancyMessage = `You added ${expenseName} with catergory ${catergory}`;

let expenses =[];

//function...

//function to add an expense
function addExpense (name, amount) {
      let expense = {name: name,
            amount: amount
      };

expenses.push(expense);

renderExpenses();
updateTotal();
}

//function to display all expenses
function renderExpenses(){
     expenseList.innerHTML = ""; 
     expenses.forEach(exp => {
      let li = document.createElement(li);
      li.textContent = `${exp.name}: $
      {exp.amount}`;
         expenseList.appendChild(li);
     });
}

// function to calculate the total

function updateTotal() {
      let total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      totalDisplay.textContent = total;
}


// How these functions fit your tracker:
//addExpense → takes the data from your input boxes and stores it.
//renderExpenses → shows everything in the list on screen.
//updateTotal → calculates and updates the total at the bottom.