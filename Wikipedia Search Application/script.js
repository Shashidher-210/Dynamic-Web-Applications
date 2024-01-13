let searchInputElement=document.getElementById("searchInput");
let spinnerElement=document.getElementById("spinner");
let searchResultsElement = document.getElementById("searchResults");

function createAndAppendSearchResult(result) {
    let { link, title, description } = result;
  
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
  
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);
  
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
  
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);
  
    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);
  
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
  
    searchResultsElement.appendChild(resultItemEl);
  }

function displayResults(searchResults) {
    spinnerElement.classList.toggle("d-none")
  
    for (let result of searchResults) {
      createAndAppendSearchResult(result);
    }
  }

function searchWikipedia(event){
if(event.key==="Enter"){
    searchResultsElement.textContent="";
    spinnerElement.classList.toggle("d-none")
    let searchInput=searchInputElement.value
    let url="https://apis.ccbp.in/wiki-search?search="+searchInput;
    let options={
        method:"GET"
    };
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        let {search_results}=jsonData;
        displayResults(search_results);
    });
}
}
searchInputElement.addEventListener("keydown",searchWikipedia);
