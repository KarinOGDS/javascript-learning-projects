// ===== DOM ELEMENTS =====

const patientForm = document.getElementById("patientForm");
const patientsTableBody = document.getElementById("patientsTableBody");

const message = document.getElementById("message");

const totalPatients = document.getElementById("totalPatients");
const diabetesCount = document.getElementById("diabetesCount");
const thyroidCount = document.getElementById("thyroidCount");
const bloodPressureCount = document.getElementById("bloodPressureCount");

const filterCondition = document.getElementById("filterCondition");
const filterGender = document.getElementById("filterGender");

const saveBtn = document.getElementById("saveBtn");

const btnSearch = document.getElementById("btnSearch");

// ===== STATE =====

let patients = JSON.parse(localStorage.getItem("patients")) || [];

let editIndex = null;

// ===== INITIALIZE =====

renderPatients();
updateDashboard();

// ===== FORM SUBMIT =====

patientForm.addEventListener("submit", function (event) {
    event.preventDefault();

    savePatient();
});

// ===== SAVE PATIENT =====

function savePatient() {

    const name = document.getElementById("name").value.trim();

    const genderInput = document.querySelector(
        'input[name="gender"]:checked'
    );

    const age = document.getElementById("age").value;

    const condition = document.getElementById("condition").value;

    if (!name || !genderInput || !age || !condition) {

        showMessage(
            "Please complete all fields.",
            "error"
        );

        return;
    }

    const patient = {
        name,
        gender: genderInput.value,
        age,
        condition
    };

    if (editIndex === null) {

        patients.push(patient);

        showMessage(
            "Patient added successfully.",
            "success"
        );

    } else {

        patients[editIndex] = patient;

        showMessage(
            "Patient updated successfully.",
            "success"
        );

        editIndex = null;

        saveBtn.textContent = "Add Patient";
    }

    saveToLocalStorage();

    patientForm.reset();

    renderPatients();

    updateDashboard();
}

// ===== RENDER TABLE =====

function renderPatients() {

    patientsTableBody.innerHTML = "";

    const filteredPatients = patients.filter(patient => {

        const matchesCondition =
            filterCondition.value === "All" ||
            patient.condition === filterCondition.value;

        const matchesGender =
            filterGender.value === "All" ||
            patient.gender === filterGender.value;

        return matchesCondition && matchesGender;
    });

    if (filteredPatients.length === 0) {

        patientsTableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No patients found.
                </td>
            </tr>
        `;

        return;
    }

    filteredPatients.forEach((patient) => {

        const originalIndex = patients.indexOf(patient);

        patientsTableBody.innerHTML += `
            <tr>

                <td>${patient.name}</td>

                <td>${patient.gender}</td>

                <td>${patient.age}</td>

                <td>${patient.condition}</td>

                <td>

                    <div class="actions">

                        <button
                            class="edit-btn"
                            onclick="editPatient(${originalIndex})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deletePatient(${originalIndex})">

                            Delete

                        </button>

                    </div>

                </td>

            </tr>
        `;
    });
}

// ===== EDIT =====

function editPatient(index) {

    const patient = patients[index];

    document.getElementById("name").value =
        patient.name;

    document.getElementById("age").value =
        patient.age;

    document.getElementById("condition").value =
        patient.condition;

    document.querySelector(
        `input[name="gender"][value="${patient.gender}"]`
    ).checked = true;

    editIndex = index;

    saveBtn.textContent = "Update Patient";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ===== DELETE =====

function deletePatient(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) {
        return;
    }

    patients.splice(index, 1);

    saveToLocalStorage();

    renderPatients();

    updateDashboard();

    showMessage(
        "Patient deleted successfully.",
        "success"
    );
}

// ===== DASHBOARD =====

function updateDashboard() {

    totalPatients.textContent =
        patients.length;

    diabetesCount.textContent =
        patients.filter(
            patient => patient.condition === "Diabetes"
        ).length;

    thyroidCount.textContent =
        patients.filter(
            patient => patient.condition === "Thyroid"
        ).length;

    bloodPressureCount.textContent =
        patients.filter(
            patient =>
                patient.condition === "High Blood Pressure"
        ).length;
}

// ===== LOCAL STORAGE =====

function saveToLocalStorage() {

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );
}

// ===== FILTERS =====

filterCondition.addEventListener(
    "change",
    renderPatients
);

filterGender.addEventListener(
    "change",
    renderPatients
);

// ===== MESSAGES =====

function showMessage(text, type) {

    message.textContent = text;

    message.className = `message ${type}`;

    setTimeout(() => {

        message.className = "message";

    }, 3000);
}

// ===== CONDITION SEARCH =====

btnSearch.addEventListener(
    "click",
    searchCondition
);

function searchCondition() {

    const input = document
        .getElementById("conditionInput")
        .value
        .trim()
        .toLowerCase();

    const resultDiv =
        document.getElementById("result");

    resultDiv.innerHTML = "";

    if (!input) {

        resultDiv.innerHTML =
            "<p>Please enter a condition.</p>";

        return;
    }

    fetch("data.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load condition data."
                );
            }

            return response.json();
        })

        .then(data => {

            const condition =
                data.conditions.find(item =>
                    item.name.toLowerCase() === input
                );

            if (!condition) {

                resultDiv.innerHTML = `
                    <p>
                        Condition not found.
                    </p>
                `;

                return;
            }

            resultDiv.innerHTML = `
                <h3>${condition.name}</h3>

                <img
                    src="${condition.imagesrc}"
                    alt="${condition.name}">

                <p>
                    <strong>Symptoms:</strong>
                    ${condition.symptoms.join(", ")}
                </p>

                <p>
                    <strong>Prevention:</strong>
                    ${condition.prevention.join(", ")}
                </p>

                <p>
                    <strong>Treatment:</strong>
                    ${condition.treatment}
                </p>
            `;
        })

        .catch(error => {

            resultDiv.innerHTML = `
                <p>
                    ${error.message}
                </p>
            `;
        });
}