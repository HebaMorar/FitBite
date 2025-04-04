//form ارسال
document.addEventListener("DOMContentLoaded", function() {
    const submit = document.getElementById("submit");

    submit.addEventListener("click", function(event) {
        event.preventDefault(); 
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const branch = document.getElementById("branch").value;
        const title = message.substring(0, 400); 
            emailjs.send("service_5zn2s8r", "template_q1s8qp7", {
            email: email,
            name: name,
            message: message,
            branch: branch,
            title: title 
        }, "FfTY43HT2F--Y2oJI")
        .then(response => {
            alert("تم إرسال رسالتك بنجاح");
             })
        .catch(error => {
            alert("حدث خطأ ، يرجى المحاولة مرة أخرى.");
            });
    });
});
