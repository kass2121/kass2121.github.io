window.onload = function() {
    fetchEmployees();
    document.getElementById('refresh').onclick = fetchEmployees;
}

async function fetchEmployees() {
    let result = await fetch('https://randomuser.me/api/?results=5');
    let employee = await result.json();
    renderEmployees(employee.results);
}

function renderEmployees(employee) {
    for (let i = 0; i < employee.length; i++) {
        let empArray = employee[i];
        document.getElementById('img' + i).src = empArray.picture.large;
        document.getElementById('person-name-' + i).textContent = empArray.name.first + " " + empArray.name.last;
        document.getElementById('gender' + i).textContent = 'Gender: ' + empArray.gender;
        document.getElementById('email' + i).textContent = empArray.email;
    }
}