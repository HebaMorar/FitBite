document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameinput = document.getElementById("name");
    const passwordinput = document.getElementById("password");
    const submit = document.getElementById("submit");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); 
      const name = nameinput.value.trim();
      const password = passwordinput.value.trim();
  
  
      localStorage.setItem("username", name);
  
     
       window.location.href = "/html/index.html"; 
    });
  
    submit.addEventListener("click", function () {
    });
  });
  