var xhr = new XMLHttpRequest();
var url = './data.json';

var allArticles = [];

var articlesDiv = document.getElementById('articles');
var statusText = document.getElementById('status');
var searchInput = document.getElementById('searchInput');

xhr.open('GET', url, true);
xhr.responseType = 'json';

xhr.onload = function () {

    if (xhr.status === 200) {

        allArticles = xhr.response.articles;

        statusText.textContent = '';

        renderArticles(allArticles);

    } else {

        statusText.textContent = 'Unable to load articles.';
    }
};

xhr.onerror = function () {
    statusText.textContent = 'Unable to load articles.';
};

xhr.send();

function renderArticles(articles) {

    articlesDiv.innerHTML = '';

    if (articles.length === 0) {

        articlesDiv.innerHTML =
            '<p class="no-results">No articles found.</p>';

        return;
    }

    articles.forEach(function (article) {

        var articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        articleDiv.innerHTML = `
            <h2>${article.title}</h2>

            <p>${article.description}</p>

            <button class="toggle-btn">
                Read More
            </button>

            <div class="details hidden">

                <h3>Ways to Achieve</h3>

                <ul>
                    ${article.ways_to_achieve
                        .map(function (way) {
                            return `<li>${way}</li>`;
                        })
                        .join('')}
                </ul>

                <h3>Benefits</h3>

                <ul>
                    ${article.benefits
                        .map(function (benefit) {
                            return `<li>${benefit}</li>`;
                        })
                        .join('')}
                </ul>

            </div>
        `;

        var button =
            articleDiv.querySelector('.toggle-btn');

        var details =
            articleDiv.querySelector('.details');

        button.addEventListener('click', function () {

            details.classList.toggle('hidden');

            button.textContent =
                details.classList.contains('hidden')
                    ? 'Read More'
                    : 'Read Less';
        });

        articlesDiv.appendChild(articleDiv);
    });
}

searchInput.addEventListener('input', function () {

    var searchTerm =
        searchInput.value.toLowerCase();

    var filteredArticles =
        allArticles.filter(function (article) {

            return article.title
                .toLowerCase()
                .includes(searchTerm);
        });

    renderArticles(filteredArticles);
});