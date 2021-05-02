// Add your code here
const url = 'http://localhost:3000/users';
let users = []; //this will be used to display a list of all users
//get form element
const personForm = document.getElementById('person-form');
const personList = document.getElementById('person-list');
//add on action
personForm.addEventListener('submit', submitNewPerson);

//call function to display all users
displayAllUsers();

function displayAllUsers()
{
    fetch(url)
    .then(res => res.json())
    .then((json) => { 
        users = json;
        getUserData();
    });
}

function getUserData()
{   
    users.forEach(displayPerson);
}

function submitNewPerson(event)
{   
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    submitData(name, email);    
}



function submitData(name, email)
{
    const person = {name, email};
    let configObj = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(person)
    };

    return fetch(url, configObj)
    .then(res => res.json())
    .then(displayPerson)
    .catch((error) => logError(error));
}

function logError(error)
{
    const errorDiv = document.createElement("div");
    errorDiv.innerHTML = error;
    document.body.appendChild(errorDiv);
    console.log(error);
}

function displayPerson(data)
{
    console.log(data);
    const person = document.createElement('li');
    person.innerHTML = `Name: ${data.name} Email: ${data.email} (ID: ${data.id})`;
    personList.appendChild(person);
}