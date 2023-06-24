const parser = new DOMParser();

export function searchHTMLPage(url, keyword){
    return new Promise((resolve, reject) => {
        downloadHTMLPage(url)
            .then(htmlContent => {
                const doc = parser.parseFromString(htmlContent, 'text/html');

                const elementsWithWord = Array.from(doc.body.querySelectorAll("a,p,strong")).filter(element => {
                    return element.textContent.includes(keyword);
                });

                let takenWords = elementsWithWord.filter(element => (element.hasAttribute('href') && element.getAttribute('href').length > 0));

                if (takenWords.length > 0) {
                    resolve(1);
                } else {
                    resolve(0);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

async function downloadHTMLPage(url) {
    try {
        const response = await axios.get('/download', {
            params: {
                url: url,
            },
            responseType: 'text',
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        // Handle the error
    }
}
