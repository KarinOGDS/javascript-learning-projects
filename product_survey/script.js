function submitFeedback() {

    const username =
        document
            .getElementById("name")
            .value
            .trim();

    const age =
        document
            .getElementById("age")
            .value
            .trim();

    const email =
        document
            .getElementById("email")
            .value
            .trim();

    const job =
        document
            .getElementById("job")
            .value
            .trim();

    const designation =
        document
            .getElementById("designation")
            .value
            .trim();

    const productType =
        document
            .getElementById("productType")
            .value;

    const feedback =
        document
            .getElementById("feedbackText")
            .value
            .trim();

    if (
        !username ||
        !age ||
        !email ||
        !job ||
        !designation ||
        !feedback
    ) {

        alert(
            "Please complete all fields."
        );

        return;
    }

    alert(
        "Thank you for your feedback!"
    );

    document
        .getElementById("userName")
        .textContent = username;

    document
        .getElementById("userAge")
        .textContent = age;

    document
        .getElementById("userEmail")
        .textContent = email;

    document
        .getElementById("userJob")
        .textContent = job;

    document
        .getElementById("userDesignation")
        .textContent = designation;

    document
        .getElementById("userProductChoice")
        .textContent = productType;

    document
        .getElementById("userFeedback")
        .textContent = feedback;

    document
        .getElementById("userInfo")
        .style
        .display = "block";
}

const submitButton =
    document.getElementById(
        "submitBtn"
    );

submitButton.addEventListener(
    "click",
    submitFeedback
);

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            submitFeedback();
        }

    }
);