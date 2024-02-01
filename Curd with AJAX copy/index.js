// const BASE_API_URL = "https://jsonplaceholder.typicode.com/todos";
const BASE_API_URL = "http://localhost:3000/users";

// GET API CALL
function loadData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.responseType = 'json';
    xmlhttp.open('GET', BASE_API_URL, true);
    xmlhttp.onload = function () {
        var jsonResponse = xmlhttp.response;
        console.log("res", jsonResponse);
        bindjsondata(jsonResponse);
    };
    xmlhttp.send(null);
}

// POST API CALL
function postData(data) {
    
    var json = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", BASE_API_URL);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onload = function () {
        var jsonResponse = xmlhttp.response;
        console.log("res", jsonResponse);
        loadData();
    };
    xmlhttp.send(json);
}

// PUT API CALL
function putData(id, data) {

    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", BASE_API_URL + '/' + id, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
            loadData();
        } else {
            console.error(users);
        }
    }
    xhr.send(json);
}

// DELETE API CALL
function deleteData(id) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("DELETE", BASE_API_URL + '/' + id, true);
    xmlhttp.onload = function () {
        var users = JSON.parse(xmlhttp.responseText);
        if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
            console.table(users);
            loadData();
        } else {
            console.error(users);
        }
    }
    xmlhttp.send(null);
}

// BIND TABLE
function bindjsondata(arr) {
    document.querySelector("#userList tbody").innerHTML = "";
    arr.forEach(function (item, index) {
        insertNewRecord(item);
    });
}

loadData();

var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null){
            // insertNewRecord(formData);
            postData(formData);
        } else {
            let id = selectedRow.cells[0].innerHTML;
            putData(id, formData);
            // updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["title"] = document.getElementById("title").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("userList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell0.innerHTML = data.id;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.title;
    cell4 = newRow.insertCell(2);
    cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button>
                       <button onClick="onDelete(this, `+ data.id + `)">Delete</button>`;
}

function resetForm() {
    document.getElementById("title").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("title").value = selectedRow.cells[1].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.id;
    selectedRow.cells[1].innerHTML = formData.title;
}

function onDelete(td, id) {
    if (confirm('Are you sure to delete this record ?')) {
        // row = td.parentElement.parentElement;
        // document.getElementById("userList").deleteRow(row.rowIndex);
        // resetForm();
        deleteData(id);
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("title").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}