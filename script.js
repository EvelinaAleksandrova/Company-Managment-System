let addEmployeeButton = document.getElementById('add-new-employee-button');
let removeButton = document.querySelectorAll('.delete-btn');

// let listEmployee = document.getElementById('employees-list');
let table = document.getElementById("table");
let newName = document.getElementById('new-name');
let newWorkIDNumber = document.getElementById('new-work-id-number');
let newPassword = document.getElementById('new-password');
let newRank = document.getElementById('new-rank');
let newPosition = document.getElementById('new-position');
let newSalary = document.getElementById('new-salary');

let currentIndexOfEmployee;
let employeeList = [];

function check() {
    let ceo = {
        "name": "Nadejda Ivanova",
        "workIDNumberForCEO": "1",
        "passwordCEO": "1"
    }
    let inputWorkIDNumber = document.getElementById('work-id-number').value;
    let inputPassword = document.getElementById('password').value;

    if (inputWorkIDNumber === ceo.workIDNumberForCEO) {
        if (inputPassword === ceo.passwordCEO) {
            openFormCeoOperations();
        } else {
            alert("Wrong work ID number or password!");
        }
    } else {
        alert("Wrong work ID number or password!");
    }

    document.getElementById('work-id-number').value = "";
    document.getElementById('password').value = "";
}

function openFormCeoOperations() {
    document.getElementById('ceo-operations').style.display = "block";
    document.getElementById('log-out-ceo-button').style.display = "block";
    document.getElementById("h1-ceo-operations").style.display = "block";
    document.getElementById('login-operation').style.display = "none";
    document.getElementById('change-employee-operations').style.display = "none";
}

function closeCeoLogOut() {
    document.getElementById('ceo-operations').style.display = 'none';
    document.getElementById('log-out-ceo-button').style.display = 'none';
    document.getElementById("h1-ceo-operations").style.display = "none";
    document.getElementById('change-employee-operations').style.display = "none";
    document.getElementById("login-operation").style.display = "block";
}


function loadLocalStorageEmployees() {
    //key is employee
    if (localStorage.getItem("employees")) {
        employeeList = JSON.parse(localStorage.getItem("employees")) || [];
        showEmployees();
    }
}

loadLocalStorageEmployees();

function showEmployees() {
    let employeeTemplate = '';

    // aktyalni danni v masiva
    employeeList.forEach(function (item, index) {

        document.getElementById('new-name').value = '';
        document.getElementById('new-work-id-number').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('new-rank').value = '';
        document.getElementById('new-position').value = '';
        document.getElementById('new-salary').value = '';
        // <tr>
        //     <td>Alfreds Futterkiste</td>
        //     <td>Maria Anders</td>
        //     <td>Germany</td>
        // </tr>
        // employeeTemplate += `<li>
        //     <span class="employee">${item.employeeName} </span>|
        //     <span class="employee">${item.employeeWorkIDNumber} </span>|
        //     <span class="employee">${item.employeePassword} </span>|
        //     <span class="employee">${item.employeeRank} </span>|
        //     <span class="employee">${item.employeePosition} </span>|
        //     <span class="employee">${item.employeeSalary} </span>|
        //     <button class="delete-btn-employee"  onclick="removeEmployee(${index})">Discharge</button>
        //     <button class="edit-salary-btn" onclick="editEmployee(${index})">Edit</button>
        // </li>`;
        table.innerHTML +=` 
        <tr>
            <td class="employee">${item.employeeName} </td>
            <td class="employee">${item.employeeWorkIDNumber} </td>
            <td class="employee">${item.employeePassword} </td>
            <td class="employee">${item.employeeRank} </td>
            <td class="employee">${item.employeePosition} </td>
            <td class="employee">${item.employeeSalary} </td>
            <td id="edit-btn-td"><button class="edit-salary-btn" onclick="editEmployee(${index})">Edit</button>
            <button class="delete-btn-employee"  onclick="removeEmployee(${index})">Discharge</button></td>
        </tr>`;
    });
    // listEmployee.innerHTML = employeeTemplate;
    // table.innerHTML = employeeTemplate;
}

function updateLocalStorageEmployees() {
    localStorage.setItem("employees", JSON.stringify(employeeList));
}

function changeEmployee() {
    employeeList[currentIndexOfEmployee].employeeName = document.getElementById("change-name").value;
    employeeList[currentIndexOfEmployee].employeeWorkIDNumber = document.getElementById("change-work-id-number").value;
    employeeList[currentIndexOfEmployee].employeePassword = document.getElementById("change-password").value;
    employeeList[currentIndexOfEmployee].employeeRank = document.getElementById("change-rank").value;
    employeeList[currentIndexOfEmployee].employeePosition = document.getElementById("change-position").value;
    employeeList[currentIndexOfEmployee].employeeSalary = document.getElementById("change-salary").value;

    updateLocalStorageEmployees();
    showEmployees();

    document.getElementById('add-employee-operations').style.display = "block";
    document.getElementById('change-employee-operations').style.display = "none";
}

function editEmployee(index) {
    currentIndexOfEmployee = index;

    document.getElementById('add-employee-operations').style.display = "none";
    document.getElementById('change-employee-operations').style.display = "block";

    document.getElementById("change-name").value = employeeList[index].employeeName;
    document.getElementById("change-work-id-number").value = employeeList[index].employeeWorkIDNumber;
    document.getElementById("change-password").value = employeeList[index].employeePassword;
    document.getElementById("change-rank").value = employeeList[index].employeeRank;
    document.getElementById("change-position").value = employeeList[index].employeePosition;
    document.getElementById("change-salary").value = employeeList[index].employeeSalary;
}

function removeEmployee(index) {
    employeeList.splice(index, 1);
    updateLocalStorageEmployees();
    showEmployees();

    return this.parentNode.remove();
}

function addEmployee() {
    let newEmployee = {
        employeeName: newName.value,
        employeeWorkIDNumber: newWorkIDNumber.value,
        employeePassword: newPassword.value,
        employeeRank: newRank.value,
        employeePosition: newPosition.value,
        employeeSalary: newSalary.value
    }

    if (newName.value || newWorkIDNumber.value
        || newPassword.value || newRank.value
        || newPosition.value || newSalary.value !== "") {
        employeeList.push(newEmployee);
        showEmployees();
        updateLocalStorageEmployees();
    }
}

console.log(employeeList);
employeeList[0].employeeSalary = 1200;

// 0:
// employeeName: "Erik"
// employeePassword: "3"
// employeePosition: "journalist"
// employeeRank: "senior"
// employeeSalary: "4000"
// employeeWorkIDNumber: "#3"
//     [[Prototype]]: Object
// 1:
// employeeName: "evi aleksandrova"
// employeePassword: "2"
// employeePosition: "journalist"
// employeeRank: "junior"
// employeeSalary: "1200"
// employeeWorkIDNumber: "2"
//     [[Prototype]]: Object
// length: 2
//     [[Prototype]]: Array(0)

// Name <input type="text" id="change-name">
// Work ID Number <input type="text" id="change-work-id-number" placeholder="#123456789"/>
// Password <input id="change-password" type="password"/>
// Rank <input type="text" id="change-rank">
// Position <input type="text" id="change-position">
// Salary <input type="text" id="change-salary">
// employeeList[index].employeeSalary = 1200;

// employeeName: newName.value,
//     employeeWorkIDNumber: newWorkIDNumber.value,
//     employeePassword: newPassword.value,
//     employeeRank: newRank.value,
//     employeePosition: newPosition.value,
//     employeeSalary: newSalary.value