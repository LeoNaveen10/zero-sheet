### Steps to Run:

#### Docker:

* Set the secrets in the .env file.
* Base Image used : node:20-alpine
* To build the image : `docker build -t zero-sheet .`
* To Run image as container: `docker run zero-sheet`

#### Normal way:

* Set the secrets in .env file.
* Run `npm install`
* Run `node index.js`


### Code Explanation:

    This code-block uses theschedulers to fetch current currency value from Rapid-APIs free API, process the data and upload the resulting data into the google sheets through zerosheet API. Zerosheet provides 500 free API calls per month. The schedulers in the code here makes call twice per day(once per 12 hours) to fetch the data and upload it to the Sheets.

###### packages used:

1. node-cron --> used to run the schedulars.
2. dotenv --> to read the secrets from .env file.
3. axios --> to make network calls to Rapid API and zerosheet API.
