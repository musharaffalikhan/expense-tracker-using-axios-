
// adding new expense to crud 
function saveToCrudCrud(event){
    event.preventDefault();
    const expenseAmount = event.target.expenseamount.value;
    const description = event.target.descriptionId.value;
    const category = event.target.category.value;
    const myObj ={
        expenseAmount,
        description,
        category,
    }
    axios.post("https://crudcrud.com/api/36ae3d7dde8d4f2aabb18cbe8948198a/appointmentData" , myObj)
    .then((response) =>{
        showNewExpenseOnScreen(response.data)
    })
    .catch((err) =>{
        document.body.innerHTML=document.body.innerHTML+"<h4> Something went wrong </h4>"
        console.log(err);
    })
}

// retrieving data from crud 

window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/36ae3d7dde8d4f2aabb18cbe8948198a/appointmentData")
    .then((response)=>{
        console.log(response);
        for(var i=0; i<response.data.length; i++){
            showNewExpenseOnScreen(response.data[i])
        }
    })
    .catch((error) =>{
        console.log(error);
    })
})

function showNewExpenseOnScreen(user){
    document.getElementById('description').value = "";
    document.getElementById('expenseamount').value = "";
    document.getElementById('category').value = "";

    if(localStorage.getItem(user.description)!==null){
        removeExpenseFromScreen(user.description);
    }
    const parentNode = document.getElementById('listOfExpense');
    const childHTML = `<li id=${user._id}>${user.expenseAmount}  -  ${user.description}  -  ${user.category}
                        <button onclick=deleteExpense('${user._id}')> Delete Expense </button>
                        <button onclick=editExpenseDetails('${user.description}','${user.expenseAmount}','${user.category}','${user._id}')> Edit Expense </button>
                        </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;                  
}

// edit expense 

function editExpenseDetails(descriptionId,expenseAmount,category,userId){
    document.getElementById('description').value = descriptionId;
    document.getElementById('expenseamount').value = expenseAmount;
    document.getElementById('category').value = category;

    deleteExpense(userId);  
}

// delete expense 
function deleteExpense(userId){
    axios.delete(`https://crudcrud.com/api/36ae3d7dde8d4f2aabb18cbe8948198a/appointmentData/${userId}`)
    .then((response)=>{
        removeExpenseFromScreen(userId , response)
    })
    .catch((err) =>{
        console.log(err);
    })
}
function removeExpenseFromScreen(userId){
    const parentNode = document.getElementById('listOfExpense');
    const childNodeToBeDeleted =  document.getElementById(userId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
    }
}