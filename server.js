const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer')
const app = express();
const port = 8000;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/download', async (req, res) => {
    const url = req.query.url;
    const browser = await puppeteer.launch({ headless: "new" });
    try {

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Get the content of the page
        const content = await page.content();

        // Set the response headers to trigger the file download
        res.setHeader('Content-disposition', 'attachment; filename=download.html');
        res.setHeader('Content-type', 'text/html');
        res.send(content);
        console.log(content)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while downloading the page.');
    } finally {
        if (browser)
            await browser.close()
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

