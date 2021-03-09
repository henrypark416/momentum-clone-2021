const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; //TODOS_LS is the key in localStorage and the name of the key is "toDos"

let toDosArray = []; //toDosArray is used to store many toDoObjs

function deleteToDo(event) {
    const btn = event.target; //target the btn
    const li = btn.parentNode; //target the parent of btn which is li
    toDoList.removeChild(li); //from ul remove the targetted li
    let cleanToDos = toDosArray.filter(function(something) {
        return something.id !== parseInt(li.id); //eliminate function something and return only those with id that is not clicked
    }); //parsed is to make the li.id into integer
    toDosArray = cleanToDos; //now original toDosArray is the new cleanToDos
    saveToDos(); //saves the fact that an object was deleted from the array
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDosArray)); //save stringified toDoObjs in toDos
}

function paintToDo(toDosValue) {
    const li = document.createElement("li"); //create element li inside the body
    const delBtn = document.createElement("button"); //create element button inside the body
    const span = document.createElement("span"); //create emelemt span inside the body
    const newId = toDosArray.length + 1; //id is the legnth of he toDos plus 1
    delBtn.innerText = "X"; //button has "X" innerText 
    delBtn.addEventListener("click", deleteToDo); //listen for the delBtn being clicked, then execute funtion called deleteToDo
    span.innerText = toDosValue; //span had toDosValue as the innerText
    li.appendChild(delBtn); //make delBtn child of li
    li.appendChild(span); //make span child of li
    toDoList.appendChild(li); //make li child of toDoList which is ul
    li.id = newId; //give id to li
    const toDoObj = {
        text: toDosValue, //toDoObj has text which is the toDosValue 
        id: newId //toDoObj has id which is the newId
    };
    toDosArray.push(toDoObj); //put toDoObj in the array called toDos
    saveToDos(); //execute saveToDos()
}

function handleSubmit(event) {
    event.preventDefault(); //default behavior of submit is to send data somewhere and refresh the page --> make the data stay in the input
    const toDosValue = toDoInput.value; //what i type in the input is the toDosValue
    paintToDo(toDosValue); //execute paintToDo with toDosValue as the data
    toDoInput.value = ""; //make the toDoInput empty 
}

function loadToDos() {
    const toDosValueInLS = localStorage.getItem(TODOS_LS); //toDosValue is the name of the value of "toDos"
    if (toDosValueInLS !== null) {
        const parsedToDos = JSON.parse(toDosValueInLS); //make string into js readable code
        parsedToDos.forEach(function(something) {
            paintToDo(something.text); //for each object in the array, execute funtion(something) which extracts text from the object
        });
    } 
}

function init() {
    loadToDos(); //check for toDoValueInLS
    toDoForm.addEventListener("submit", handleSubmit); //listen for the toDoForm being submitted, then execute funtion called handleSubmit
}

init(); //the only executed function from the start and it executes loadToDos()