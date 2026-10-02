// 1. Array ya kuhifadhi wanafunzi
let students = [
    { fullname: "Jane", email: "jane@gmail.com", phone: "0712345678", course: "IT" },
    { fullname: "John", email: "john@gmail.com", phone: "0787654321", course: "CS" },
    { fullname: "Juma", email: "jumazabron@gmail.com", phone: "0787653279", course: "Industrial Automation" },
    { fullname: "Salome", email: "salome@gmail.com", phone: "0658943264", course: "Engineering" }
];

// Rejea za vitu vya HTML
const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');
const studentIndexInput = document.getElementById('studentIndex');
const btnSubmit = document.getElementById('btnSubmit');
const btnUpdate = document.getElementById('btnUpdate');

// -------------------------------------------------------------
// A. READ: Onyesha meza ya wanafunzi
// -------------------------------------------------------------
function renderStudents() {
    if (!tableBody) return;
    tableBody.innerHTML = ''; // Safisha meza kwanza

    if (students.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Hakuna mwanafunzi aliyesajiliwa.</td></tr>';
        return;
    }

    students.forEach((student, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.fullname}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.course}</td>
            <td>
                <button type="button" class="btn-edit" onclick="editStudent(${index})">Edit</button>
                <button type="button" class="btn-delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// -------------------------------------------------------------
// B. CREATE & UPDATE: Save Mwanafunzi
// -------------------------------------------------------------
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Zuia ukurasa kurefresh

        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const course = document.getElementById('course').value;

        const editIndex = parseInt(studentIndexInput ? studentIndexInput.value : -1);

        if (editIndex === -1) {
            // Add: Ongeza mwanafunzi mpya
            students.push({ fullname, email, phone, course });
        } else {
            // Update: Rekebisha mwanafunzi aliyepo
            students[editIndex] = { fullname, email, phone, course };
        }

        resetForm();
        renderStudents();
    });
}

// -------------------------------------------------------------
// C. EDIT: Weka data kwenye fomu
// -------------------------------------------------------------
function editStudent(index) {
    const student = students[index];

    document.getElementById('fullname').value = student.fullname;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone;
    document.getElementById('course').value = student.course;

    if (studentIndexInput) {
        studentIndexInput.value = index;
    }

    if (btnSubmit) btnSubmit.style.display = 'none';
    if (btnUpdate) btnUpdate.style.display = 'inline-block';
}

// -------------------------------------------------------------
// D. DELETE: Futa mwanafunzi
// -------------------------------------------------------------
function deleteStudent(index) {
    if (confirm("Je, una uhakika unataka kufuta taarifa za mwanafunzi huyu?")) {
        students.splice(index, 1); // Ondoa kwenye array
        renderStudents();          // Onyesha meza upya
    }
}

// -------------------------------------------------------------
// E. RESET: Safisha fomu
// -------------------------------------------------------------
function resetForm() {
    if (form) form.reset();
    if (studentIndexInput) studentIndexInput.value = -1;
    if (btnSubmit) btnSubmit.style.display = 'inline-block';
    if (btnUpdate) btnUpdate.style.display = 'none';
}

// Anzisha mchakato wa kuonyesha meza mara ya kwanza
renderStudents();

const API_URL = 'http://localhost:5000/api/v1/students';
