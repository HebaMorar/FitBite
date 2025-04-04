document.addEventListener("DOMContentLoaded", function () { 
    let clinicButtons = document.querySelectorAll(".time.in-person button");
    let zoomButtons = document.querySelectorAll(".time.zoom button");
    let calendarButtons = document.querySelectorAll(".calendar button");
    let specialistDropdown = document.getElementById("Specialist");
    let submitBtn = document.getElementById("submit");
    let selectedMeetupType = "";
    let selectedDate = "";
    let selectedTime = "";
    let username = localStorage.getItem("username"); // جلب الاسم من localStorage

    emailjs.init("It-sbHLw6ZlCW49EV"); 

    function resetButtonStyles() {
        [...clinicButtons, ...zoomButtons, ...calendarButtons].forEach(button => {
            button.style.backgroundColor = "";
            button.style.color = "";
            button.classList.remove("active");
        });
    }

    document.getElementById("typecon").addEventListener("change", function () {
        let selectedType = this.value;
        specialistDropdown.querySelectorAll("option").forEach(option => {
            option.style.display = (option.dataset.type === selectedType || option.value === "") ? "block" : "none";
        });
    });

    function applyButtonStyles(type) {
        resetButtonStyles();
        selectedMeetupType = type;

        calendarButtons.forEach(button => {
            if ((type === "زوم" && button.classList.contains("zoom")) || (type === "عيادة" && button.classList.contains("in-person"))) {
                button.style.backgroundColor = (type === "زوم") ? "#2e7d32" : "#66bb6a"; // ألوان جديدة
                button.style.color = "white";
                button.style.fontWeight = "bold";
            }
        });

        let buttonsToHighlight = (type === "زوم") ? zoomButtons : clinicButtons;
        buttonsToHighlight.forEach(button => {
            button.style.backgroundColor = (type === "زوم") ? "#2e7d32" : "#66bb6a"; // ألوان جديدة
            button.style.color = "white";
        });

        submitBtn.style.display = "inline-block";
    }

    document.getElementById("online").addEventListener("click", function (e) {
        e.preventDefault();
        applyButtonStyles("زوم");
    });

    document.getElementById("inperson").addEventListener("click", function (e) {
        e.preventDefault();
        applyButtonStyles("عيادة");
    });

    calendarButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (!selectedMeetupType) {
                alert("يرجى اختيار نوع اللقاء أولاً.");
                return;
            }
            calendarButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            selectedDate = button.textContent;
        });
    });

    document.querySelectorAll(".time button").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".time button").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            selectedTime = button.textContent;
            alert(`تم تحديد اليوم: ${selectedDate} والوقت: ${selectedTime}`);
        });
    });

    submitBtn.addEventListener("click", function () {
        let selectedSpecialist = specialistDropdown.value;

        if (!selectedSpecialist || !selectedMeetupType || !selectedDate || !selectedTime) {
            alert("يرجى اختيار جميع البيانات.");
            return;
        }

        emailjs.send("service_w2bhnnl", "template_jrrodi9", {
            name: username, // استخدام الاسم المخزن في localStorage
            typeCon: selectedMeetupType,
            specialist: selectedSpecialist,
            date: selectedDate,
            time: selectedTime
        })
        .then(response => {
            alert("تم إرسال الحجز بنجاح");
        }).catch(error => {
            alert("حدث خطأ ، حاول مجددا");
        });
    });

    resetButtonStyles(); 
});
