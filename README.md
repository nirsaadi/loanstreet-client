# loanstreet-client

A simple react client to interact with the API of the loans-service.
React version - 17.0.2

## Install
To launch the client at http://localhost:3000/loans do the following steps:
1. Download the project to your local machine
2. Navigate to the project's main folder
3. run the following command:
```bash
npm start
```

**Note**: <br/>
As this is a demo client - security has been disabled.
If you are attempting to browse using chrome - please run chrome with the following command and use the newly opened browser.
```bash
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
```

## Usage
* To create a new loan - use "Create Loan" button. An automatic ID will be generated.
* To update an existing loan you must put an existing Loan ID in the appropriate form input.

* To see all existing Loans - click the "Show Loan Details".
  If the ID input is populated with an existing Loan ID - that specific loan details will be displayed.
  If no ID given - it will show all loans.  
