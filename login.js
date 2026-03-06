const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function(){

const username = document.getElementById("name").value;
const password = document.getElementById("password").value;
const errorMsg = document.getElementById("errorMsg");

if(username === "admin" && password === "admin123"){

window.location.href = "dashboard.html";

}
else{

errorMsg.classList.remove("hidden");

}

});