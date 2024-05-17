let btnModalClose = document.getElementById("close-modal");
let changePasswordModal = document.getElementById("changePasswordModal").style.display = "block";
window.onclick = function (event) {
    if (event.target == changePasswordModal || event.target == btnModalClose) {
        changePasswordModal.style.display = "none";
    }
}