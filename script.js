document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inventory-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send data to Google Spreadsheet using Google Sheets API
        sendDataToGoogleSpreadsheet(data);
    });

    function sendDataToGoogleSpreadsheet(data) {
        // You need to implement this function to send data to Google Spreadsheet using the provided API credentials
        // Example:
        // Use fetch() or any library to make a POST request to Google Sheets API endpoint with the data
        // Refer to Google Sheets API documentation for more details: https://developers.google.com/sheets/api/reference/rest
        // Example URL: https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append
        // Example request body: { "range": "Sheet1!A1", "values": [[data.partDescription, data.quantity, data.location, data.condition, data.serialNumber, data.compatibilityInfo, data.comments]] }
    }
});
