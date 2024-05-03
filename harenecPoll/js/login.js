document.getElementById("username").addEventListener("focusout", validateLogin);
// document.getElementById("username").addEventListener("input", countNameLen);

document.getElementById("password").addEventListener("focusout", validatePassword);

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

function validateLogin() {
    let output = validateInput("username", "Zadajte login.", "err-login");
    return output;
}

function validatePassword() {
    let output = validateInput("password", "Zadajte heslo.", "err-password");
    return output;
}

function checkValues() {
    if (validateLogin() == 1) {
        return false;
    }
    if (validatePassword() == 1) {
        return false;
    }
}