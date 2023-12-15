# Backlink Google API Search
Simple locally runned script to search backlinks on websites found by google search engine using Custom Search JSON API by Google.<br/>
Google allows 100 queries per day for free. For one query returns one page (10 search results). <br/>
This Google API will never return more than 100 searches (10 pages).
## SETUP 
1. Setup programmable search engine by Google and get Search Engine ID. You have to setup the pages on which you want to search there.
2. Enable API at console.cloud.google.com and get APIKEY (https://developers.google.com/explorer-help/code-samples)
3. Set the attribute ´cx´ to search engine ID SEID in function execute() in file  public/skript.js
4. Assign the API key to ´gapi.client.setApiKey´ in function loadClient in file public/skript.js
5. `npm install`
6. `cd node_modules/puppetter && npm install`

## RUN
`node server.js`

# Disclaimer
It's supposed to be run only locally, therefor the security of private keys, wasn't managed. 
