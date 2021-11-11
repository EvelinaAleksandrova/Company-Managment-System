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
let currentIndexOfMaterial;

let currentWorkIDForEmployee;

let employeeList = [];
let materialsList = [];

let director = {
    employeeName: "Mariya Petrova",
    employeeWorkIDNumber: "#1",
    employeePassword: "1",
    employeeRank: "director",
    employeePosition: "executive director",
    employeeSalary: "6000"
}

for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].employeeWorkIDNumber === director.employeeWorkIDNumber) {
        break;
    } else {
        employeeList.push(director);
        updateLocalStorageEmployees();
        showEmployees();
    }
}

function check() {
    let flagLogIn = false;
    let inputWorkIDNumber = document.getElementById('work-id-number').value;
    let inputPassword = document.getElementById('password').value;

    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].employeeWorkIDNumber === inputWorkIDNumber) {
            if (employeeList[i].employeePassword === inputPassword) {

                if (employeeList[i].employeePosition === "executive director") {
                    document.getElementById('h1-ceo-operations-message').innerText
                        = "CURRENT LOGIN \n" + employeeList[i].employeeName +
                        "\nID - " + employeeList[i].employeeWorkIDNumber
                        + "\nposition - " + employeeList[i].employeePosition;

                    openFormDirectorOperations();
                    flagLogIn = true;
                } else {
                    document.getElementById('h1-employee-operations-message').innerText
                        = "CURRENT LOGIN \n" + employeeList[i].employeeName +
                        "\nID - " + employeeList[i].employeeWorkIDNumber
                        + "\nposition - " + employeeList[i].employeePosition;

                    currentWorkIDForEmployee = employeeList[i].employeeWorkIDNumber;

                    document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;

                    openFormEmployeeOperations();
                    flagLogIn = true;
                }
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
    currentWorkIDForEmployee = "";
}

function loadLocalStorageEmployees() {
    if (localStorage.getItem("employees")) {
        employeeList = JSON.parse(localStorage.getItem("employees")) || [];
        showEmployees();
    }
}

function loadLocalStorageMaterials() {
    if (localStorage.getItem("materials")) {
        materialsList = JSON.parse(localStorage.getItem("materials")) || [];
        showMaterials();
    }
}

loadLocalStorageEmployees();
loadLocalStorageMaterials();

function showEmployees() {
    let employeeTemplate = '';
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
            
            <td id="edit-btn-td"><button class="edit-salary-btn" id="edit-salary-btn" 
            onclick="editEmployee(${index})">Edit</button>
            <button class="delete-btn-employee"  id="delete-btn-employee"
             onclick="removeEmployee(${index})">Discharge</button></td>
        </tr>`;
    });
    table.innerHTML = employeeTemplate;
}

function showMaterials() {
    let materialsTemplate = '';
    materialsList.forEach(function (material, index) {

        document.getElementById('new-article-name').value = '';
        document.getElementById('new-article-text').value = '';
        document.getElementById('work-id-number-of-employee-material').value = '';
        document.getElementById('new-accessibility-article').value = '';

        materialsTemplate += `
                 <tr>
                    <th>Name of Material</th>
                    <th>Description</th>
                    <th>Work ID</th>
                    <th>Accessibility</th>
                    <th></th>
                </tr>
        <tr>
            <td class="material">${material.materialName} </td>
            <td class="material">${material.materialText} </td>
            <td class="material">${material.employeeIDMaterial} </td>
            <td class="material">${material.accessibilityArticle} </td>
            
            <td id="material-btn-td"><button class="edit-btn-material" onclick="editMaterial(${index})">Edit</button>
            <button class="delete-btn-material" onclick="removeMaterial(${index})">Delete</button></td>
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
    let salary = document.getElementById("change-salary").value;
    if (Number.isInteger(parseInt(salary)) && parseInt(salary) > 0) {
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
    } else {
        alert("Salary must be a positive number!");
    }

}

function changeMaterial() {
    // let flagDuplicateArticleName = false;
    // // let flagDuplicateArticleText = false;
    //
    // let changeNameOfArticle = document.getElementById("change-article-name").value;
    // // let changeTextOfArticle = document.getElementById("change-article-text").value;
    //
    // for (let i = 0; i < materialsList.length; i++) {
    //     if (materialsList[i].materialName === changeNameOfArticle) {
    //         flagDuplicateArticleName = true;
    //     }
    // }
    // if (flagDuplicateArticleName === false) {


    if (materialsList[currentIndexOfMaterial].accessibilityArticle === "public") {
        materialsList[currentIndexOfMaterial].materialName = document.getElementById("change-article-name").value;
        materialsList[currentIndexOfMaterial].materialText = document.getElementById("change-article-text").value;
        // materialsList[currentIndexOfMaterial].employeeIDMaterial = document.getElementById("change-work-id-number-of-employee-material").value;
        updateLocalStorageMaterials();
        showMaterials();

        document.getElementById('add-material-operations').style.display = "block";
        document.getElementById('change-material-operations').style.display = "none";

        document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
        document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;

        if (materialsList[currentIndexOfMaterial].employeeIDMaterial === currentWorkIDForEmployee) {
            materialsList[currentIndexOfMaterial].accessibilityArticle = document.getElementById("change-accessibility-article").value;
            updateLocalStorageMaterials();
            showMaterials();

        } else {
            alert("You don't have permission to change access to material!");
        }
    } else {
        if (materialsList[currentIndexOfMaterial].employeeIDMaterial === currentWorkIDForEmployee) {
            materialsList[currentIndexOfMaterial].accessibilityArticle = document.getElementById("change-accessibility-article").value;

            updateLocalStorageMaterials();
            showMaterials();
        }
        materialsList[currentIndexOfMaterial].materialName = document.getElementById("change-article-name").value;
        materialsList[currentIndexOfMaterial].materialText = document.getElementById("change-article-text").value;
        // materialsList[currentIndexOfMaterial].employeeIDMaterial = document.getElementById("change-work-id-number-of-employee-material").value;
        updateLocalStorageMaterials();
        showMaterials();

        document.getElementById('add-material-operations').style.display = "block";
        document.getElementById('change-material-operations').style.display = "none";

        document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
        document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;
    }
    // } else {
    //     if (flagDuplicateArticleName === true) {
    //         alert("Duplicate material name. Change with other name!");
    //     }
    //     // if (flagDuplicateArticleText === true) {
    //     //     alert("Duplicate material text. Change with other text!");
    //     // }
    // }
    // document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
    // document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;
}

function denyEmployeeButton() {
    document.getElementById('add-employee-operations').style.display = "block";
    document.getElementById('change-employee-operations').style.display = "none";
}

function cancelMaterialButton() {
    document.getElementById('add-material-operations').style.display = "block";
    document.getElementById('change-material-operations').style.display = "none";
}

function editEmployee(index) {
    currentIndexOfEmployee = index;

    if (employeeList[index].employeeWorkIDNumber === director.employeeWorkIDNumber) {
        alert("You don't have access to edit Executive Director!");
    } else {

        document.getElementById('add-employee-operations').style.display = "none";
        document.getElementById('change-employee-operations').style.display = "block";

        document.getElementById("change-name").value = employeeList[index].employeeName;
        document.getElementById("change-work-id-number").value = employeeList[index].employeeWorkIDNumber;
        document.getElementById("change-password").value = employeeList[index].employeePassword;
        document.getElementById("change-rank").value = employeeList[index].employeeRank;
        document.getElementById("change-position").value = employeeList[index].employeePosition;
        document.getElementById("change-salary").value = employeeList[index].employeeSalary;
    }


}

function editMaterial(index) {
    currentIndexOfMaterial = index;

    if (materialsList[index].accessibilityArticle === "private") {
        if (currentWorkIDForEmployee === materialsList[index].employeeIDMaterial) {
            document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
            document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;

            document.getElementById('add-material-operations').style.display = "none";
            document.getElementById('change-material-operations').style.display = "block";

            document.getElementById("change-article-name").value = materialsList[index].materialName;
            document.getElementById("change-article-text").value = materialsList[index].materialText;
            document.getElementById("change-work-id-number-of-employee-material").value = materialsList[index].employeeIDMaterial;
            document.getElementById("change-accessibility-article").value = materialsList[index].accessibilityArticle;
        } else {
            alert("You DON'T have access to EDIT this private material!!");
        }
    } else if (materialsList[index].accessibilityArticle === "public") {
        document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
        document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;

        document.getElementById('add-material-operations').style.display = "none";
        document.getElementById('change-material-operations').style.display = "block";

        document.getElementById("change-article-name").value = materialsList[index].materialName;
        document.getElementById("change-article-text").value = materialsList[index].materialText;
        document.getElementById("change-work-id-number-of-employee-material").value = materialsList[index].employeeIDMaterial;
        document.getElementById("change-accessibility-article").value = materialsList[index].accessibilityArticle;
    }
}

function removeEmployee(index) {
    let currentRemoveEmployeeIDNumber = employeeList[index].employeeWorkIDNumber; // #3

    if (employeeList[index].employeeWorkIDNumber === director.employeeWorkIDNumber) {
        alert("You don't have access to delete Executive Director!");
    } else {
        for (let index = 0; index < materialsList.length; index++) {
            if (materialsList[index].employeeIDMaterial === currentRemoveEmployeeIDNumber) {
                removeMaterial(index);
            }
        }
        employeeList.splice(index, 1);
        updateLocalStorageEmployees();
        showEmployees();

        return this.parentNode.remove();
    }
}

function removeMaterial(index) {
    if (materialsList[index].accessibilityArticle === "private") {

        // if (currentWorkIDForEmployee !== materialsList[index].employeeIDMaterial) {
        //     alert("You DON't have access to DELETE this private material!!");
        //     return;
        // } else if (director.employeeWorkIDNumber === "#1") {
        //
        // }

        if (currentWorkIDForEmployee === materialsList[index].employeeIDMaterial || director.employeeWorkIDNumber === "#1") {
            
            document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
            document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;

            materialsList.splice(index, 1);
            updateLocalStorageMaterials();
            showMaterials();

            return this.parentNode.remove();

        } else {
            alert("You don't have access to delete this material!");
        }

    } else if (materialsList[index].accessibilityArticle === "public") {
        document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
        document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;

        materialsList.splice(index, 1);
        updateLocalStorageMaterials();
        showMaterials();

        return this.parentNode.remove();
    }
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

        if (Number.isInteger(parseInt(newSalary.value)) && parseInt(newSalary.value) > 0) {
            if (flagDuplicateID === false) {
                employeeList.push(newEmployee);
                showEmployees();
                updateLocalStorageEmployees();
            } else {
                alert("Duplicate work ID number. You must change with other work ID number!");
            }
        } else {
            alert("You must enter number for salary or positive number!");
        }

    } else {
        alert("Empty field! Please fill in all input fields.");
    }
}

function addMaterial() {
    let flagDuplicateArticleName = false;
    let flagDuplicateArticleText = false;

    document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
    document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;

    let newMaterial = {
        materialName: newArticleName.value,
        materialText: newArticleText.value,
        employeeIDMaterial: newWorkIDEmployeeMaterial.value,
        accessibilityArticle: newAccessibility.value
    }

    for (let i = 0; i < materialsList.length; i++) {
        if (materialsList[i].materialName === newArticleName.value) {
            flagDuplicateArticleName = true;
            if (materialsList[i].materialText === newArticleText.value) {
                flagDuplicateArticleText = true;
            }
        }
    }

    if (newArticleName.value !== "" &&
        newArticleText.value !== "" &&
        newWorkIDEmployeeMaterial.value !== "" &&
        newAccessibility.value !== "") {

        if (flagDuplicateArticleText === false && flagDuplicateArticleName === false) {
            materialsList.push(newMaterial);
            showMaterials();
            updateLocalStorageMaterials();
            document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
            document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;
        } else {
            if (flagDuplicateArticleName === true) {
                alert("Duplicate material name. Change with other name!");
            }
            if (flagDuplicateArticleText === true) {
                alert("Duplicate material text. Change with other text!");
            }
        }
        document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
        document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;

    } else {
        document.getElementById("work-id-number-of-employee-material").value = currentWorkIDForEmployee;
        document.getElementById("change-work-id-number-of-employee-material").value = currentWorkIDForEmployee;
        alert("Empty field. Please fill in all input fields.");
    }
}
