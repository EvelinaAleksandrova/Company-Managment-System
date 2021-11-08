let addEmployeeButton = document.getElementById('add-new-employee-button');
let removeButton = document.querySelectorAll('.delete-btn');

let listEmployee = document.getElementById('employees-list');

let newName = document.getElementById('new-name');
let newWorkIDNumber = document.getElementById('new-work-id-number');
let newPassword = document.getElementById('new-password');
let newRank = document.getElementById('new-rank');
let newPosition = document.getElementById('new-position');
let newSalary = document.getElementById('new-salary');


// class Company {
//     constructor(listWithEmployees, listWithMaterials) {
//         this._listWithEmployees = listWithEmployees;
//         this._listWithMaterials = listWithMaterials;
//     }
//
//
//     get listWithEmployees() {
//         return this._listWithEmployees;
//     }
//
//     set listWithEmployees(value) {
//         this._listWithEmployees = value;
//     }
//
//     get listWithMaterials() {
//         return this._listWithMaterials;
//     }
//
//     set listWithMaterials(value) {
//         this._listWithMaterials = value;
//     }
// }
//
// class Employee {
//     constructor(name, workIDNumber, password, rank, position, salary) {
//         this._name = name;
//         this._workIDNumber = workIDNumber;
//         this._password = password;
//         this._rank = rank;
//         this._position = position;
//         this._salary = salary;
//
//     }
//
//
//     get getName() {
//         return this._name;
//     }
//
//     set setName(value) {
//         this._name = value;
//     }
//
//     get workIDNumber() {
//         return this._workIDNumber;
//     }
//
//     set setWorkIDNumber(value) {
//         this._workIDNumber = value;
//     }
//
//     get getPassword() {
//         return this._password;
//     }
//
//     set setPassword(value) {
//         this._password = value;
//     }
//
//     get rank() {
//         return this._rank;
//     }
//
//     set rank(value) {
//         this._rank = value;
//     }
//
//     get position() {
//         return this._position;
//     }
//
//     set position(value) {
//         this._position = value;
//     }
//
//     get salary() {
//         return this._salary;
//     }
//
//     set salary(value) {
//         this._salary = value;
//     }
//
//
// }
//
// class Material {
//     constructor(nameOfMaterial, accessibility, authorForMaterial) {
//         this._nameOfMaterial = nameOfMaterial;
//         this._accesibility = accessibility;
//         this._authorForMaterial = authorForMaterial;
//         this._accessibility = accessibility;
//     }
//
//
//     get nameOfMaterial() {
//         return this._nameOfMaterial;
//     }
//
//     set nameOfMaterial(value) {
//         this._nameOfMaterial = value;
//     }
//
//     get accessibility() {
//         return this._accessibility;
//     }
//
//     set accessibility(value) {
//         this._accessibility = value;
//     }
//
//     get authorForMaterial() {
//         return this._authorForMaterial;
//     }
//
//     set authorForMaterial(value) {
//         this._authorForMaterial = value;
//     }
// }
//
// let employee1 = new Employee("Nadejda Ivanova", "#3367761", "bmnolbrewo14weg", "ceo", "chief executive officer", 3000);
// let employee2 = new Employee("Anton Petrov", "#3365888", "rgerhg89vveg", "low", "journalist", 1500);
// let employee3 = new Employee("Nina Atanasova", "#3365785", "dsonobrewo25weg", "low", "journalist", 1400);
// let employee4 = new Employee("Nikolai Popov", "#3361347", "rbndfbndfwo114weg", "low", "journalist", 1900);
// let employee5 = new Employee("Viktor Georgiev", "#3366975", "aebdfbrbnn68nnn", "low", "journalist", 1700);
// let employee6 = new Employee("Anastasiq Mitkova", "#3368635", "ansigawgn78berb", "low", "journalist", 1500);
//
// let material1 = new Material("Weather Forecast", "public", employee1.name);
// let material2 = new Material("Corona virus last news", "public", employee2.name);
// let material3 = new Material("Political news", "private", employee4.name);
// let material4 = new Material("Interview with Ivaylo Petrov Minister of Energy", "private", employee5.name);
//
//
// let listEmployees = [employee1, employee2, employee3, employee4, employee5, employee6];
// let listWithMaterials = [material1, material2, material3, material4];
//
//
// let newspaperCompany = new Company(listEmployees, listWithMaterials);
//
// let flagID;
// let flagPassword;
//
// function check() {
//     let inputWorkIDNumber = document.getElementById('work-id-number').value;
//     let inputPassword = document.getElementById('password').value;
//
//     newspaperCompany.listWithEmployees.forEach(employee => {
//         for (let key in employee) {
//             console.log("KEY " + `${key}`);
//             console.log("Value " + `${employee[key]}`);
//
//             if (key === "_workIDNumber") {
//                 if (inputWorkIDNumber === employee[key]) {
//                     flagID = true;
//                 }
//             }
//             if (key === "_password") {
//                 if (inputPassword === employee[key]) {
//                     flagPassword = true;
//                 }
//             }
//         }
//     });
//
//     if (flagID === true) {
//         if (flagPassword === true) {
//             alert("Successful Log In");
//
//
//         } else {
//             alert("Wrong Password!");
//         }
//     } else {
//         alert("No such work ID number!");
//     }
//
// }


let employeeList = [];

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

        employeeTemplate += `
        <li>
            <span class="employee">${item.employeeName} </span>
            <span class="employee">${item.employeeWorkIDNumber} </span>
            <span class="employee">${item.employeePassword} </span>
            <span class="employee">${item.employeeRank} </span>
            <span class="employee">${item.employeeRank} </span>
            <span class="employee">${item.employeePosition} </span>
            <span class="employee">${item.employeeSalary} </span>
            
            <button class="delete-btn"  onclick="removeEmployee(${index})">x</button>
            <br>
        </li>
        `;
    });

    listEmployee.innerHTML = employeeTemplate;
}

function updateLocalStorageEmployees() {
    localStorage.setItem("employees", JSON.stringify(employeeList));
}

function removeEmployee(index) {
    employeeList.splice(index, 1);
    updateLocalStorageEmployees();
    showEmployees();

    return this.parentNode.remove();
}

function addEmployee() {
    // let newEmployee = new Employee("Evelina Aleksandrova",
    //     "#5236521", "evi",
    //     "low", "journalist", 2000);

    let newEmployee = {
        employeeName: newName.value,
        employeeWorkIDNumber: newWorkIDNumber.value,
        employeePassword: newPassword.value,
        employeeRank: newRank.value,
        employeePosition: newPosition.value,
        employeeSalary: newSalary.value

    }

    // if (newName.value || newWorkIDNumber.value
    //     || newPassword.value || newRank.value
    //     || newPosition.value || newSalary.value
    //     === "") {
    //     alert("EMPTY FIELD!\n\n" + "Fill in all fields");
    //     return;
    //
    // }
    // if (newName.value || newWorkIDNumber.value
    //     || newPassword.value || newRank.value
    //     || newPosition.value || newSalary.value !== "") {
    //     employeeList.push(newEmployee);
    //     showEmployees();
    //     updateLocalStorageEmployees();
    // }

    if (newName.value || newWorkIDNumber.value
        || newPassword.value || newRank.value
        || newPosition.value || newSalary.value !== "") {
        employeeList.push(newEmployee);
        showEmployees();
        updateLocalStorageEmployees();
    }

}


//
// function showsOperationsFor this

// function showMaterials() {
//     newspaperCompany.listWithMaterials.forEach(material => {
//         for (let key in material) {
//             console.log(`${key}: ${material[key]}`);
//         }
//     });
// }

