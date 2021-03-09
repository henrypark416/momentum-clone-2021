const form = document.querySelector(".js-form"), //selecting the form from the father (body)
input = form.querySelector("input"), //selecting the input from the father (form)
greeting = document.querySelector(".js-greetings"); //selecting the h4 from the father (body)

const USER_LS = "currentUser", //USER_LS is the key in localStorage and the name of the key is "currentUser"
SHOWING = "showing"; //class name that makes something display:block

function saveName(currentUserValue) {
    localStorage.setItem(USER_LS, currentUserValue); //save currentUserValue as the value for the key called "currentUser" defined as USER_LS
}

function handleSubmit(event) {
    event.preventDefault(); //default behavior of submit is to send data somewhere and refresh the page --> make the data stay in the input
    const currentUserValue = input.value; //what i type in the input is the currentUserValue
    paintGreeting(currentUserValue); //execute paintGreeting with currentUserValue as the data
    saveName(currentUserValue); //execute saveName with currentUserValue as the data
}

function askForName() {
    form.classList.add(SHOWING); //make the form display:block
    form.addEventListener("submit", handleSubmit); //listen for the form being submitted, then execute funtion called handleSubmit
}

function paintGreeting(currentUserValue) {
    form.classList.remove(SHOWING); //get the form back to display:none
    greeting.classList.add(SHOWING); //make the greeting display:block
    greeting.innerText = `Hello ${currentUserValue}`; //set the text inside h4 class="js-greetings"
}

function loadName() {
    const currentUserValue = localStorage.getItem(USER_LS); //currentUserValue is the name of the value of "currentUser"
    if (currentUserValue === null) {
        askForName(); //if there is no currentUserValue saved in the localStorage execute askForName()
    } else {
        paintGreeting(currentUserValue); //if there is currentUserValue, execute paintGreeting with currentUserValue as the data
    }
}

function init() {
    loadName(); //check if there is currentUserValue or not
}

init(); //the only executed function from the start and it executes loadName()