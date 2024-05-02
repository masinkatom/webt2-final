// ocument.getElementById("username").addEventListener("focusout", validateLogin);
// document.getElementById("username").addEventListener("input", countNameLen);

// document.getElementById("password").addEventListener("focusout", validatePassword);

// document.getElementById("submit-btn").addEventListener("click", checkValues);

// function displayError(input, msg, errInput) {
//     errInput.style.display = 'block';
//     errInput.innerHTML = msg;
//     input.style.border = '3px solid red';
// }

// function hideError(input, errInput) {
//     errInput.style.display = 'none';
//     errInput.innerHTML = "";
//     input.style.border = '';
// }

// function validateLogin() {
//     let input = document.getElementById("login");
//     let errInput = document.getElementById("err-login");

//     hideCharCounter(input.nextElementSibling);
//     let output = validateInput("login", "Zadajte správny login.", "err-login");

//     if (output == 0) {
//         if (input.value.length < 5 || input.value.length > 32) {
//             displayError(input, "Login musi mat min. 5 a max. 32 znakov.", errInput);
//             return 1;
//         } 
//         if (!checkChars(input.value)) {
//             displayError(input, "Login môže obsahovať iba veľké, malé písmená, číslice a podtržník.", errInput);
//             return 1;
//         }
//     }
//     return output;
// }

// function validatePassword() {
//     let input = document.getElementById("password");
//     let errInput = document.getElementById("err-password");

//     let output = validateInput("password", "Zadajte správne heslo.", "err-password");

//     if (output == 0) {
//         if (input.value.length < 5 || input.value.length > 255) {
//             displayError(input, "Heslo musí mať min. 5 a max. 255 znakov.", errInput);
//             return 1;
//         } 
//     }
//     return output;
// }

// function checkChars(stringToCheck) {
//     let regex = /^[a-zA-Z0-9_]+$/;
//     // Test, ci obsahuje iba regex znaky - ak nie - vrat false
//     if (!regex.test(stringToCheck.trim())) {
//         return false;
//     }
//     return true;
// }

// function checkValues() {
//     if (validateLogin() == 1) {
//         return false;
//     }
//     if (validatePassword() == 1) {
//         return false;
//     }
// }