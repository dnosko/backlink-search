import {searchHTMLPage} from "./scrapper.js";

function loadGoogleApi(callback) {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';

    script.onload = function () {
        // Google API script has loaded
        gapi.load("client", function() {
            if (callback && typeof callback === 'function') {
                callback();
            }
        });
    };

    document.head.appendChild(script);
}

function loadClient() {
    return new Promise((resolve, reject) => {
        gapi.client.setApiKey("");
        gapi.client.load("https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest")
            .then(function() {
                console.log("GAPI client loaded for API");
                resolve();
            })
            .catch(function(err) {
                console.error("Error loading GAPI client for API", err);
                reject(err);
            });
    });
}

function execute(term) {
    return gapi.client.search.cse.list({
    "cx": "d13ce0691df644667",
    "exactTerms": term,
    "filter": "0"
}).then(function(response) {
        return response.result.items;
    }).catch(function(err) {
            console.error("Error executing API request", err);
        });
}

function createTextElement(text, element){
    const para = document.createElement(element);
    para.textContent = text
    document.body.appendChild(para)
}



export function search(){
    let searchTerm = document.getElementById("searchterm").value;
    createTextElement(searchTerm, 'h1')
    let links = []

    async function searchLink(link) {
        try {
            const res = await searchHTMLPage(link, searchTerm);
            return { taken: res, link: link };
        } catch (error) {
            return { taken: 2, link: link };
        }
    }

    async function executeSearch() {
        try {
            await loadGoogleApi();
            await loadClient();
            const items = await execute(searchTerm);

            const promises = items.map(item => searchLink(item.link));
            const results = await Promise.all(promises);

            links = results;
            console.log(links);

            // Call the render function here
            render(links);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    executeSearch();


    //console.log(links)
}

/* renders one category of links. Links is array of objects of type {taken:Number, link:String}
   Text is used for heading, and filterParameter is number corresponding to taken category.
*/
function renderOneCategory(links, text, filterParameter){
    createTextElement(text, 'h2')
    console.log(links)
    const filtered = links.filter(element => element.taken === filterParameter);
    console.log(filtered)
    filtered.forEach(function (item){
        const linkElement = document.createElement('a');
        linkElement.href = item.link;
        linkElement.textContent = item.link;
        document.body.appendChild(linkElement);
        const brElement = document.createElement('br');
        document.body.appendChild(brElement);
    })
}

function render(links){
    renderOneCategory(links,'Volné', 0)
    renderOneCategory(links,'Zabraté', 1)
    renderOneCategory(links,'Treba manuálne', 2)
}