let searchInputElement = document.getElementById("searchInput");
let spinnerElement = document.getElementById("spinner");
let searchResultsElement = document.getElementById("searchResults");
let resultItemEl = document.getElementById("resultElement");

function createAndAppendSearchResult(result) {
    let {
        imageLink,
        author
    } = result;

    let divEl = document.createElement("div");
    divEl.classList.add("divcontainer");
    let imgEl = document.createElement("img");
    imgEl.src = imageLink;
    imgEl.classList.add("image");
    divEl.appendChild(imgEl);

    let descriptionEl = document.createElement("h1");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = author;
    divEl.appendChild(descriptionEl);

    resultItemEl.appendChild(divEl);

    searchResultsElement.appendChild(resultItemEl);

}

function displayResults(searchResults) {
    spinnerElement.classList.toggle("d-none");
    let headingEl = document.createElement('h1');
    headingEl.classList.add("heading");
    searchResultsElement.appendChild(headingEl);
    if (searchResults.length === 0) {
        headingEl.textContent = 'No results found';
    } else {
        headingEl.textContent = 'Popular Books';
        for (let result of searchResults) {
            createAndAppendSearchResult(result);
        }
    }
}

function libraryBooks(event) {
    if (event.key === "Enter") {

        resultItemEl.textContent = "";
        searchResultsElement.textContent="";
        spinnerElement.classList.toggle("d-none");

        let searchInput = searchInputElement.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputElement.addEventListener("keydown", libraryBooks);
