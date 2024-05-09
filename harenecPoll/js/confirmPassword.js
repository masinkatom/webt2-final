let oldPassword = document.getElementById("old-password");
oldPassword.addEventListener("focusout", function() {
    validatePassword("old-password", "Zadajte stare hesloXXX", "err-old-password");    
});

let newPassword = document.getElementById("new-password");
newPassword.addEventListener("focusout", function() {
    validatePassword("new-password", "Zadajte nove hesloXXX", "err-new-password");    
});
newPassword.addEventListener("input", countPasswordLen);

let confirmNewPassword = document.getElementById("confirm-new-password");
confirmNewPassword.addEventListener("focusout", function() {
    validatePassword("confirm-new-password", "Potvrdte nove hesloXXX", "err-confirm-new-password");
});

document.getElementById("submit-btn").addEventListener("click", checkValues);

function displayError(input, msg, errInput) {
    errInput.style.display = 'block';
    errInput.innerHTML = msg;
    input.style.border = '3px solid red';
}

function hideError(input, errInput) {
    errInput.style.display = 'none';
    errInput.innerHTML = "";
    input.style.border = '';
}

function validateInput(inputId, errMessage, errInputId) {
    let input = document.getElementById(inputId);
    let errInput = document.getElementById(errInputId);

    if (input.value.trim() === "" || input.value == "null") {
        displayError(input, errMessage, errInput);
        return 1;
    } else {
        hideError(input, errInput);
        return 0;
    }
}

function countLength(spanCounter, input, countTo) {
    spanCounter.style.display = "flex";

    if (input.value.length > countTo) {
        input.value = input.value.substring(0, countTo);
    }
    spanCounter.textContent = input.value.length + " / " + countTo;
}

function countPasswordLen() {
    countLength(this.nextElementSibling, this, 255);
    if (this.value.length >= 6) {
        this.nextElementSibling.style.color = "green";   
    } else {
        this.nextElementSibling.style.color = "red";
    }
}

function validatePassword(id, message, errMsgId) {
    let output = validateInput(id, message, errMsgId);
    return output;
}

function checkValues() {
    if (confirmNewPassword.value !== newPassword.value) {
        displayError(confirmNewPassword, "zadane hesla sa nezhoduju", document.getElementById("err-confirm-new-password"));
    } else {
        hideError(confirmNewPassword, document.getElementById("err-confirm-new-password"));
    }
}