class Student {
    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {
        this.name = name;
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;
    }

    set grade1(value) {
        this.#grade1 = this.validate(value);
    }
    get grade1() { return this.#grade1; }

    set grade2(value) {
        this.#grade2 = this.validate(value);
    }
    get grade2() { return this.#grade2; }

    set grade3(value) {
        this.#grade3 = this.validate(value);
    }
    get grade3() { return this.#grade3; }

    set attendance(value) {
        this.#attendance = this.validate(value);
    }
    get attendance() { return this.#attendance; }

    validate(value) {
        let number = Number(value);
        if (value === "" || !Number.isFinite(number) || number < 0 || number > 100) {
            throw new Error("يجب إدخال درجة من 0 إلى 100");
        }
        return number;
    }

    getAverage() {
        return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
    }
}

let studentsList = [];

const nameInput = document.getElementById("studentName");
const grade1Input = document.getElementById("grade1");
const grade2Input = document.getElementById("grade2");
const grade3Input = document.getElementById("grade3");
const attendanceInput = document.getElementById("attendance");

const studentsBox = document.getElementById("studentsBox");
const report = document.getElementById("report");

document.getElementById("addStudent").addEventListener("click", function () {
    try {
        let name = nameInput.value.trim();

        if (!name) {
            throw new Error("من فضلك أدخل اسم الطالب");
        }

        let student = new Student(
            name,
            grade1Input.value,
            grade2Input.value,
            grade3Input.value,
            attendanceInput.value
        );

        studentsList.push(student);
        displayStudents();

        nameInput.value = "";
        grade1Input.value = "";
        grade2Input.value = "";
        grade3Input.value = "";
        attendanceInput.value = "";

    } catch (error) {
        alert(error.message);
    }
});

function displayStudents() {
    studentsBox.innerHTML = "";

    studentsList.forEach(function(student) {
        studentsBox.innerHTML += `
            <div class="border-bottom py-2">
                اسم الطالب: ${student.name}<br>
                المتوسط: ${student.getAverage().toFixed(2)}<br>
                الحضور: ${student.attendance}%
            </div>
        `;
    });
}

document.getElementById("mercyButton").addEventListener("click", function () {
    let eligibleStudents = studentsList.filter(student =>
        student.getAverage() >= 40 && student.getAverage() <= 49
    );

    let updatedStudents = eligibleStudents.map(student => ({
        name: student.name,
        oldAverage: student.getAverage(),
        newAverage: student.getAverage() + 5
    }));

    let total = updatedStudents.reduce(
        (sum, student) => sum + student.newAverage, 0
    );

    let message = "<h5>تقرير لجنة الرأفة</h5>";

    if (updatedStudents.length === 0) {
        message += "<p>لا يوجد طلاب مستحقون لدرجات الرأفة.</p>";
    } else {
        updatedStudents.forEach(student => {
            message += `
                <p>
                الطالب: ${student.name}<br>
                المتوسط قبل الرأفة: ${student.oldAverage.toFixed(2)}<br>
                المتوسط بعد الرأفة: ${student.newAverage.toFixed(2)}
                </p>
            `;
        });

        message += `<p>إجمالي المتوسطات بعد الرأفة: ${total.toFixed(2)}</p>`;
    }

    report.innerHTML = message;
});
