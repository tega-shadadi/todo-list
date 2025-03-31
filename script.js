/*
-Add Event listener on +,
-onclick store in a variable
-then get the li HTML and wrap around the variable.
-then put it as innerHTML into <ul>.
*/

// Initialize the todoItems array
let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [
  "Respond to Emails ASAP!!!",
  "Attend the meeting with HR",
  "Call of duty Black Ops"
];

// Load and render items on page load
loadStorage();
console.log(todoItems)
renderItems();

//Adding Event listener to Add button
const addButton = document.querySelector(".input-plus-icon-js")

addButton.addEventListener('click',()=>{
  addItems();
  notify();
})

function renderItems(){
  loadStorage();
  document.querySelector(".list-items").innerHTML=""

  todoItems.slice().reverse().forEach((todoItem, index) => {
    
    document.querySelector(".list-items").innerHTML+=
      `
      <li class="list-item" data-index="${todoItems.length - 1 - index}">
          <span class="todo-text-js">${todoItem}</span>
          <div>
            <img src="./images/pen-fill.svg" class="pen pen-js" alt="Edit">
            <img src="./images/trash3.svg" class="trash trash-js" alt="Delete">
          </div>
        </li>
        
      `
     
  });
  //Adding Event listener to trash Icon and running the delete functions
  const deleteButtons = document.querySelectorAll(".trash-js")

  deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click',
    (event) => {
      const listItem = event.target.closest(".list-item"); // Find the closest <li> element
      const index = listItem.dataset.index; // Get the data-index from the <li>
      
      deleteItem(index);
      notifyDelete(); // Call delete function with index
    }
  )
  });

  //Adding Event listeners to all pen-icons for strike-through function
  penButtons=document.querySelectorAll(".pen-js")
  penButtons.forEach((penButton)=>(
    penButton.addEventListener('click',(event)=>{
      const listItem = event.target.closest(".list-item"); // Find the closest <li> element
      const todoText = listItem.querySelector(".todo-text-js"); // Get the <span> element with the text
      const index = listItem.dataset.index; // Get the data-index from the <li>
      strikeThrough(index, todoText); // Pass both index and todoText to the function
    })
  ))



}

function addItems(){
  //Saving input value to a Variable
  const todoItem = document.querySelector(".todo-input-field-js").value
  console.log(todoItems)
  if (todoItem !== ""){
    todoItems.push(todoItem)
    saveToStorage();
    
    document.querySelector(".list-items").innerHTML = "" //first clear the existing HTML and re-render afresh
    document.querySelector(".todo-input-field-js").value="";
    renderItems();
    
  
  }
}

function saveToStorage(){
  localStorage.setItem("todoItems",JSON.stringify(todoItems));
}
function loadStorage() {
  // Load items from localStorage and update the todoItems array
  const storedItems = JSON.parse(localStorage.getItem("todoItems"));
  if (storedItems) {
    todoItems = storedItems;
  }
}


// Add event listener to the input field for the "Enter" key

document.querySelector(".todo-input-field-js").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItems();
    notify(); // Call the same function as the "+" button
  }
});

//The delete function


function deleteItem(index){  
      
  const storedItems = JSON.parse(localStorage.getItem("todoItems")); // Retrieve and parse the array
  if (storedItems && storedItems.length > index) { // Check if the index exists
    storedItems.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem("todoItems", JSON.stringify(storedItems)); // Update localStorage

    console.log(JSON.parse(localStorage.getItem("todoItems")))
    renderItems(); // Re-render the list to reflect the changes
    notifyDelete();
  } 
  else {
    console.log(`Index ${index} does not exist in localStorage.`);
  }

}

 //the strikeThrough function whenever the pen icon is clicked

function strikeThrough(index, todoText){
  // Toggle the "crossed" class to strike through the text
  todoText.classList.toggle("crossed");

}

function notify(){
  let notificationText = document.querySelector(".disappear");

  notificationText.classList.add("appear-js");

  setTimeout(() => {
      notificationText.classList.remove("appear-js");
  }, 2000); // 2000 milliseconds = 2 seconds


}

function notifyDelete(){
  let notificationText = document.querySelector(".delete-disappear");
  notificationText.classList.add("delete-appear-js");
  setTimeout(()=>{
    notificationText.classList.remove("delete-appear-js")
  }, 2000);
}
//notificationText = document.querySelector(".delete-disappear")
//console.log(notificationText.classList.add("delete-appear-js"));