const addbtn = document.getElementById('submit_btn');
const cancelbtn = document.getElementById('cancel_btn');
const resetbtn = document.getElementById('reset_btn');
const recordContainer = document.querySelector('.record_container');
const deleteButton = document.getElementById('delete_btn');


const Name = document.getElementById('name');
const lastName = document.getElementById('last_name');
const contactNumber = document.getElementById('contact_number');


let url = 'http://www.raydelto.org/agenda.php';
fetch(url).then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))


//adding contact record
addbtn.addEventListener('click', function() {

    if (checkInputfields([Name, lastName, contactNumber])) {
        setMessage('success', "Contacto agredado");

        fetch('http://www.raydelto.org/agenda.php', {
            method: 'POST',
            body: JSON.stringify({
                'nombre': Name.value,
                'apellido': lastName.value,
                'telefono': contactNumber.value,
            })

        })

        clearInputFields();

    } else {
        setMessage('error', "campos vacios o numero de telefono inválido");
    }
});


const mostrarData = (data) => {
    const newRecordDiv = document.createElement('div');
    newRecordDiv.classList.add('record_container');
    newRecordDiv.classList.add('record_item');
    console.log(data);
    for (let i = 0; i < data.length; i++) {

        newRecordDiv.innerHTML += `  
        
        <div class="record_item">
            <div class="record_el">
                <span id="labelling">Nombre: </span>
                <span id="Contact_id_content">${data[i].nombre}</span>    
            </div>

            <div class="record_el">
                <span id="labelling">Apellido: </span>
                <span id="Contact_id_content">${data[i].apellido}</span>
            </div>

            <div class="record_el">
                <span id="labelling">Telefono: </span>
                <span id="Contact_id_content">${data[i].telefono}</span>
            </div>
        </div>
      
        `
    }
    recordContainer.appendChild(newRecordDiv);
}

//
function setMessage(status, message) {
    let messageBox = document.querySelector('.message');
    if (status === 'error') {
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add('error');
        removeMessage(status, messageBox);
    }
    if (status === 'success') {
        messageBox.innerHTML = `${message}`;
        messageBox.classList.add('success');
        removeMessage(status, messageBox);
    }

}

//
cancelbtn.addEventListener('click', function() {
    clearInputFields();

});

function clearInputFields() {
    Name.value = "";
    lastName.value = "";
    contactNumber.value = "";
}

//
function removeMessage(status, messageBox) {
    setTimeout(function() {
        messageBox.classList.remove(`${status}`);
    }, 2000);
}

//input field validation

function checkInputfields(inputArr) {
    for (let i = 0; i < inputArr.length; i++) {
        if (inputArr[i].value === "") {
            return false;
        }
    }
    if (!phoneNumCheck(inputArr[2].value)) {
        return false;
    }
    return true;
}

//phone number validation function
function phoneNumCheck(inputtxt) {
    let phoneNo = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

    if (inputtxt.match(phoneNo)) {
        return true;
    } else {
        return false;
    }
}