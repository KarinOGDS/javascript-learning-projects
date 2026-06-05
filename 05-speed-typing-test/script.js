const testText =
    "The quick brown fox jumps over the lazy dog.";

let startTime;
let endTime;

function startTest() {

    document.getElementById(
        "inputText"
    ).value = "Get Ready...";

    setTimeout(() => {

        document.getElementById(
            "inputText"
        ).value = "3";

    }, 1000);

    setTimeout(() => {

        document.getElementById(
            "inputText"
        ).value = "2";

    }, 2000);

    setTimeout(() => {

        document.getElementById(
            "inputText"
        ).value = "1";

    }, 3000);

    setTimeout(() => {

        document.getElementById(
            "inputText"
        ).value = testText;

        const userInput =
            document.getElementById(
                "userInput"
            );

        userInput.value = "";

        userInput.readOnly = false;

        userInput.focus();

        document.getElementById(
            "output"
        ).innerHTML = "";

        startTime =
            new Date().getTime();

    }, 4000);

}

function endTest() {

    endTime =
        new Date().getTime();

    const userInput =
        document.getElementById(
            "userInput"
        );

    userInput.readOnly = true;

    const timeElapsed =
        (endTime - startTime) / 1000;

    const typedWords =
        userInput.value
            .split(/\s+/)
            .filter(word => word !== "")
            .length;

    const originalWords =
        testText.split(" ").length;

    const accuracy =
        Math.min(
            100,
            Math.round(
                (typedWords / originalWords) * 100
            )
        );

    const wpm =
        Math.round(
            (typedWords / timeElapsed) * 60
        );

    document.getElementById(
        "output"
    ).innerHTML =

        `
        <h2>Results</h2>

        <p>
            Words Typed:
            ${typedWords}
        </p>

        <p>
            Time:
            ${timeElapsed.toFixed(2)} seconds
        </p>

        <p>
            WPM:
            ${wpm}
        </p>

        <p>
            Accuracy:
            ${accuracy}%
        </p>
        `;

}

function resetTest() {

    document.getElementById(
        "inputText"
    ).value = "";

    document.getElementById(
        "userInput"
    ).value = "";

    document.getElementById(
        "userInput"
    ).readOnly = true;

    document.getElementById(
        "output"
    ).innerHTML = "";

}