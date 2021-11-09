let addEmployeeButton = document.getElementById('add-new-employee-button');
let removeButton = document.querySelectorAll('.delete-btn');

let table = document.getElementById("table");
let newName = document.getElementById('new-name');
let newWorkIDNumber = document.getElementById('new-work-id-number');
let newPassword = document.getElementById('new-password');
let newRank = document.getElementById('new-rank');
let newPosition = document.getElementById('new-position');
let newSalary = document.getElementById('new-salary');

let tableMaterial = document.getElementById("table-material");
let newArticleName = document.getElementById('new-article-name');
let newArticleText = document.getElementById('new-article-text');
let newWorkIDEmployeeMaterial = document.getElementById('work-id-number-of-employee-material');
let newAccessibility = document.getElementById('new-accessibility-article');


let currentIndexOfEmployee;
let employeeList = [];
let materialsList = [];

function check() {
    let flagLogIn = false;

    let director = {
        "name": "Nadejda Ivanova",
        "workIDNumberForDirector": "#1",
        "passwordDirector": "1"
    }

    let inputWorkIDNumber = document.getElementById('work-id-number').value;
    let inputPassword = document.getElementById('password').value;

    if (inputWorkIDNumber === director.workIDNumberForDirector) {
        if (inputPassword === director.passwordDirector) {
            document.getElementById('h1-ceo-operations-message').innerText
                = "Current Login - " + director.name +
                " | Work ID - " + director.workIDNumberForDirector;
            openFormDirectorOperations();
            flagLogIn = true;
        }
    }

    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].employeeWorkIDNumber === inputWorkIDNumber) {
            if (employeeList[i].employeePassword === inputPassword) {
                document.getElementById('h1-employee-operations-message').innerText
                    = "Current Login - " + employeeList[i].employeeName +
                    " | Work ID - " + employeeList[i].employeeWorkIDNumber;
                openFormEmployeeOperations();
                flagLogIn = true;
            }
        }
    }
    if (flagLogIn === false) {
        alert("Wrong work ID number or password");

    }

    document.getElementById('work-id-number').value = "";
    document.getElementById('password').value = "";
}

function openFormDirectorOperations() {
    document.getElementById('ceo-operations').style.display = "block";
    document.getElementById('log-out-ceo-button').style.display = "block";
    document.getElementById("h1-ceo-operations").style.display = "block";
    document.getElementById("h1-ceo-operations-message").style.display = "block";
    document.getElementById('change-employee-operations').style.display = "none";
    document.getElementById('login-operation').style.display = "none";
}

function closeDirectorLogOut() {
    document.getElementById('ceo-operations').style.display = 'none';
    document.getElementById('log-out-ceo-button').style.display = 'none';
    document.getElementById("h1-ceo-operations").style.display = "none";
    document.getElementById("h1-ceo-operations-message").style.display = "none";
    document.getElementById('change-employee-operations').style.display = "none";
    document.getElementById("login-operation").style.display = "block";
}

function openFormEmployeeOperations() {
    document.getElementById('employee-operations').style.display = "block";
    document.getElementById('log-out-employee-button').style.display = "block";
    document.getElementById("h1-employee-operations").style.display = "block";
    document.getElementById("h1-employee-operations-message").style.display = "block";
    document.getElementById('change-material-operations').style.display = "none";
    document.getElementById('login-operation').style.display = "none";
}

function closeEmployeeLogOut() {
    document.getElementById('employee-operations').style.display = 'none';
    document.getElementById('log-out-employee-button').style.display = 'none';
    document.getElementById("h1-employee-operations").style.display = "none";
    document.getElementById("h1-employee-operations-message").style.display = "none";
    document.getElementById('change-material-operations').style.display = "none";
    document.getElementById("login-operation").style.display = "block";
}

function loadLocalStorageEmployees() {
    //key is employees
    if (localStorage.getItem("employees")) {
        employeeList = JSON.parse(localStorage.getItem("employees")) || [];
        showEmployees();
    }
}

function loadLocalStorageMaterials() {
    // key is materials
    if (localStorage.getItem("materials")) {
        materialsList = JSON.parse(localStorage.getItem("materials")) || [];
        showMaterials();
    }
}

loadLocalStorageEmployees();
loadLocalStorageMaterials();

function showEmployees() {
    let employeeTemplate = '';

    // aktyalni danni v masiva
    employeeList.forEach(function (employee, index) {

        document.getElementById('new-name').value = '';
        document.getElementById('new-work-id-number').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('new-rank').value = '';
        document.getElementById('new-position').value = '';
        document.getElementById('new-salary').value = '';

        employeeTemplate += `
                <tr>
                    <th>Name</th>
                    <th>Work ID</th>
                    <th>Password</th>
                    <th>Rank</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th></th>
                </tr>
        <tr>
            <td class="employee">${employee.employeeName} </td>
            <td class="employee">${employee.employeeWorkIDNumber} </td>
            <td class="employee">${employee.employeePassword} </td>
            <td class="employee">${employee.employeeRank} </td>
            <td class="employee">${employee.employeePosition} </td>
            <td class="employee">${employee.employeeSalary} </td>
            
            <td id="edit-btn-td"><button class="edit-salary-btn" onclick="editEmployee(${index})">Edit</button>
            <button class="delete-btn-employee"  onclick="removeEmployee(${index})">Discharge</button></td>
        </tr>`;
    });
    table.innerHTML = employeeTemplate;
}

function showMaterials() {
    let materialsTemplate = '';

    // aktyalni danni v masiva
    materialsList.forEach(function (material, index) {

        document.getElementById('new-article-name').value = '';
        document.getElementById('new-article-text').value = '';
        document.getElementById('work-id-number-of-employee-material').value = '';
        document.getElementById('new-accessibility-article').value = '';

        materialsTemplate += `
                 <tr>
                    <th>Name of Article</th>
                    <th>Text of Article</th>
                    <th>Writer ID</th>
                    <th>Accessibility</th>
                    <th></th>
                </tr>
        <tr>
            <td class="material">${material.materialName} </td>
            <td class="material">${material.materialText} </td>
            <td class="material">${material.employeeIDMaterial} </td>
            <td class="material">${material.accessibilityArticle} </td>
            
            <td id="edit-btn-td"><button class="edit-salary-btn" ">Edit</button>
            <button class="delete-btn-employee" onclick="removeMaterial(${index})">Delete</button></td>
        </tr>`;
    });
    tableMaterial.innerHTML = materialsTemplate;
}

function updateLocalStorageEmployees() {
    localStorage.setItem("employees", JSON.stringify(employeeList));
}

function updateLocalStorageMaterials() {
    localStorage.setItem("materials", JSON.stringify(materialsList));
}

function changeEmployee() {
    employeeList[currentIndexOfEmployee].employeeName = document.getElementById("change-name").value;
    // employeeList[currentIndexOfEmployee].employeeWorkIDNumber = document.getElementById("change-work-id-number").value;
    employeeList[currentIndexOfEmployee].employeePassword = document.getElementById("change-password").value;
    employeeList[currentIndexOfEmployee].employeeRank = document.getElementById("change-rank").value;
    employeeList[currentIndexOfEmployee].employeePosition = document.getElementById("change-position").value;
    employeeList[currentIndexOfEmployee].employeeSalary = document.getElementById("change-salary").value;

    updateLocalStorageEmployees();
    showEmployees();

    document.getElementById('add-employee-operations').style.display = "block";
    document.getElementById('change-employee-operations').style.display = "none";
}

function denyEmployeeButton() {
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

function removeMaterial(index) {
    materialsList.splice(index, 1);
    updateLocalStorageMaterials();
    showMaterials();

    return this.parentNode.remove();
}


function addEmployee() {
    let flagDuplicateID = false;

    let newEmployee = {
        employeeName: newName.value,
        employeeWorkIDNumber: newWorkIDNumber.value,
        employeePassword: newPassword.value,
        employeeRank: newRank.value,
        employeePosition: newPosition.value,
        employeeSalary: newSalary.value
    }

    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].employeeWorkIDNumber === newWorkIDNumber.value) {
            flagDuplicateID = true;
            break;
        }
    }

    if (newName.value !== "" &&
        newWorkIDNumber.value !== "" &&
        newPassword.value !== "" &&
        newRank.value !== "" &&
        newPosition.value !== "" &&
        newSalary.value !== "") {

        if (Number.isInteger(parseInt(newSalary.value))) {

            if (flagDuplicateID === false) {

                employeeList.push(newEmployee);
                showEmployees();
                updateLocalStorageEmployees();
            } else {
                alert("Duplicate work ID number. You must change with other work ID number!");
            }
        } else {
            alert("You must enter number for salary!");
        }

    } else {
        alert("Empty field! Please fill in all input fields.");
    }
}

function addMaterial() {
    let newMaterial = {
        materialName: newArticleName.value,
        materialText: newArticleText.value,
        employeeIDMaterial: newWorkIDEmployeeMaterial.value,
        accessibilityArticle: newAccessibility.value
    }

    if (newArticleName.value !== "" &&
        newArticleText.value !== "" &&
        newWorkIDEmployeeMaterial.value !== "" &&
        newAccessibility.value !== "") {

        materialsList.push(newMaterial);
        showMaterials();
        updateLocalStorageMaterials();
    } else {
        alert("Empty field. Please fill in all input fields.");
    }
}

// console.log(employeeList);
// employeeList[0].employeeSalary = 1200;

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