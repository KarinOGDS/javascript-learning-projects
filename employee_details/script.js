const employees = [

    {
        id: 1,
        name: "John Doe",
        age: 30,
        department: "IT",
        salary: 50000
    },

    {
        id: 2,
        name: "Alice Smith",
        age: 28,
        department: "HR",
        salary: 45000
    },

    {
        id: 3,
        name: "Bob Johnson",
        age: 35,
        department: "Finance",
        salary: 60000
    },

    {
        id: 4,
        name: "Emma Wilson",
        age: 29,
        department: "HR",
        salary: 47000
    },

    {
        id: 5,
        name: "Michael Brown",
        age: 40,
        department: "IT",
        salary: 65000
    }

];

// Display all employees

function displayEmployees() {

    const employeeList = employees

        .map(

            employee =>

                `
                <p>
                    <strong>ID:</strong> ${employee.id}
                    |
                    <strong>Name:</strong> ${employee.name}
                    |
                    <strong>Department:</strong> ${employee.department}
                    |
                    <strong>Salary:</strong> $${employee.salary}
                </p>
                `
        )

        .join("");

    document.getElementById(
        "employeesDetails"
    ).innerHTML = employeeList;

}

// Calculate salaries

function calculateTotalSalaries() {

    const totalSalaries = employees.reduce(

        (total, employee) =>

            total + employee.salary,

        0

    );

    alert(
        `Total Salaries: $${totalSalaries}`
    );

}

// Display HR employees

function displayHREmployees() {

    const hrEmployees = employees

        .filter(

            employee =>
                employee.department === "HR"

        )

        .map(

            employee =>

                `
                <p>
                    <strong>ID:</strong> ${employee.id}
                    |
                    <strong>Name:</strong> ${employee.name}
                    |
                    <strong>Salary:</strong> $${employee.salary}
                </p>
                `
        )

        .join("");

    document.getElementById(
        "employeesDetails"
    ).innerHTML = hrEmployees;

}

// Find employee

function findEmployeeById(employeeId) {

    const foundEmployee = employees.find(

        employee =>

            employee.id === Number(employeeId)

    );

    if (foundEmployee) {

        document.getElementById(
            "employeesDetails"
        ).innerHTML =

            `
            <h3>Employee Found</h3>

            <p>
                <strong>ID:</strong>
                ${foundEmployee.id}
            </p>

            <p>
                <strong>Name:</strong>
                ${foundEmployee.name}
            </p>

            <p>
                <strong>Department:</strong>
                ${foundEmployee.department}
            </p>

            <p>
                <strong>Salary:</strong>
                $${foundEmployee.salary}
            </p>
            `;

    }

    else {

        document.getElementById(
            "employeesDetails"
        ).innerHTML =

            `
            <p>
                No employee found with the provided ID.
            </p>
            `;

    }

}