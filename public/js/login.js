const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');


var urlParams = window.location.search;

if(urlParams === '?err=logerr'){
    wrapper.classList.add('active-popup');
}
if(urlParams === '?err=regerr'){
    wrapper.classList.add('active-popup');
    wrapper.classList.add('active');
}
registerLink.addEventListener('click',()=>{
    wrapper.classList.add('active');
});
loginLink.addEventListener('click',()=>{
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click',()=>{
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click',()=>{
    wrapper.classList.remove('active-popup');
});





// ////////////////////////////////////////////////////////
// document.getElementById("myForm").addEventListener("submit", function (event) {
//     // event.preventDefault();

//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;
//     // const errorText = document.getElementById("errorText");

//     if (password !== confirmPassword) {
//     //   errorText.textContent = "Passwords do not match!";
//     alert("Passwords do not match!")
//     } else {
//       // Clear the error message if passwords match
//     //   errorText.textContent = "";
//     }

//       fetch('/register', {
//         method: 'POST',
//         body: new URLSearchParams(new FormData(document.getElementById("myForm")))
//       })
// })