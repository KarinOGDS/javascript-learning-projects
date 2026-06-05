let count = 0;

function displayCount() {

    document.getElementById(
        "countDisplay"
    ).textContent = count;

}

function increaseCount() {

    count++;

    displayCount();

    checkMilestones();

}

function decreaseCount() {

    if (count > 0) {

        count--;

        displayCount();

        checkMilestones();

    }

}

function checkMilestones() {

    const status =
        document.getElementById(
            "statusMessage"
        );

    if (
        count > 0 &&
        count % 10 === 0
    ) {

        status.textContent =
            `🎉 Congratulations! You reached ${count} followers!`;

    }

    else {

        status.textContent =
            "Keep growing your audience.";

    }

}

// Initialize display

displayCount();