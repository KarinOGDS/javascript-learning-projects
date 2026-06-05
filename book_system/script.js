let books = [];

function addBook() {

    const bookName =
        document.getElementById(
            "bookName"
        ).value.trim();

    const authorName =
        document.getElementById(
            "authorName"
        ).value.trim();

    const bookDescription =
        document.getElementById(
            "bookDescription"
        ).value.trim();

    const pagesNumber =
        Number(
            document.getElementById(
                "pagesNumber"
            ).value
        );

    if (
        !bookName ||
        !authorName ||
        !bookDescription ||
        isNaN(pagesNumber)
    ) {

        alert(
            "Please complete all fields."
        );

        return;
    }

    const book = {

        name: bookName,

        authorName: authorName,

        description: bookDescription,

        pagesNumber: pagesNumber

    };

    books.push(book);

    showBooks();

    clearInputs();

}

function showBooks() {

    const booksHTML = books

        .map(

            (book, index) =>

                `
                <h3>
                    Book ${index + 1}
                </h3>

                <p>
                    <strong>Title:</strong>
                    ${book.name}
                </p>

                <p>
                    <strong>Author:</strong>
                    ${book.authorName}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${book.description}
                </p>

                <p>
                    <strong>Pages:</strong>
                    ${book.pagesNumber}
                </p>

                <button
                    onclick="editBook(${index})">

                    Edit

                </button>

                <button
                    onclick="deleteBook(${index})">

                    Delete

                </button>

                <hr>
                `
        )

        .join("");

    document.getElementById(
        "books"
    ).innerHTML = booksHTML;

    document.getElementById(
        "totalBooks"
    ).textContent =
        `Total Books: ${books.length}`;

}

function deleteBook(index) {

    books.splice(index, 1);

    showBooks();

}

function editBook(index) {

    const book = books[index];

    document.getElementById(
        "bookName"
    ).value = book.name;

    document.getElementById(
        "authorName"
    ).value = book.authorName;

    document.getElementById(
        "bookDescription"
    ).value = book.description;

    document.getElementById(
        "pagesNumber"
    ).value = book.pagesNumber;

    books.splice(index, 1);

    showBooks();

}

function clearInputs() {

    document.getElementById(
        "bookName"
    ).value = "";

    document.getElementById(
        "authorName"
    ).value = "";

    document.getElementById(
        "bookDescription"
    ).value = "";

    document.getElementById(
        "pagesNumber"
    ).value = "";

}