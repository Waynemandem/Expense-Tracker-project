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

