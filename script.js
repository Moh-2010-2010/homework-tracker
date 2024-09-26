document.addEventListener('DOMContentLoaded', () => {
    const adminCode = '123456789'; // Set admin access code
    let students = [
        { name: 'Student 1', code: 'CODE1' },
        { name: 'Student 2', code: 'CODE2' },
        { name: 'Student 3', code: 'CODE3' }
    ];

    let homeworkList = [];

    // Load homework and students from localStorage
    function loadHomework() {
        const storedHomework = localStorage.getItem('homeworkList');
        if (storedHomework) {
            homeworkList = JSON.parse(storedHomework);
        }
    }

    function loadStudents() {
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            students = JSON.parse(storedStudents);
        }
    }

    function saveHomework() {
        localStorage.setItem('homeworkList', JSON.stringify(homeworkList));
    }

    function saveStudents() {
        localStorage.setItem('students', JSON.stringify(students));
    }

    function checkAccessCode(enteredCode) {
        if (enteredCode === adminCode) {
            return 'Admin'; // Admin identifier
        }
        
        const student = students.find(s => s.code === enteredCode);
        return student ? student.name : null;
    }

    // Handle login
    document.getElementById('login-button').addEventListener('click', () => {
        const enteredCode = document.getElementById('access-code').value;
        const userName = checkAccessCode(enteredCode);
        
        if (userName === 'Admin') {
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('admin-section').style.display = 'block';
            document.getElementById('student-section').style.display = 'block';
            alert(`Welcome, Admin!`);
            displayHomework();
        } else if (userName) {
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('admin-section').style.display = 'none'; // Hide admin section
            document.getElementById('student-section').style.display = 'block';
            alert(`Welcome, ${userName}!`);
            displayHomework();
        } else {
            alert('Invalid access code');
        }
    });

    // Handle adding homework
    document.getElementById('add-homework-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('homework-title').value;
        const dueDate = document.getElementById('due-date').value;
        homeworkList.push({ title, dueDate });
        saveHomework(); // Save to localStorage
        displayHomework();
        e.target.reset();
    });

    // Handle adding students
    document.getElementById('add-student-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('student-name').value;
        const code = document.getElementById('student-code').value;

        // Add the new student to the students array
        students.push({ name, code });
        saveStudents(); // Save students to localStorage
        
        e.target.reset();
        alert(`Student ${name} added with access code ${code}`);
    });

    // Display homework
    function displayHomework() {
        const homeworkListElement = document.getElementById('homework-list');
        homeworkListElement.innerHTML = '';
        homeworkList.forEach((homework) => {
            const li = document.createElement('li');
            li.textContent = `${homework.title} - Due: ${homework.dueDate}`;
            homeworkListElement.appendChild(li);
        });
    }

    // Load homework and students when the page is loaded
    loadStudents();
    loadHomework();
});
