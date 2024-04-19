function sendDataToGoogleSpreadsheet(data) {
    const spreadsheetId = '1GpQAmUhhRT-5_iA_PeoPaSJqLqNXpa5uPDeDh14U8i4';
    const apiKey = 'AIzaSyAEeFwpce1U2dmlvYTwV4-w7kIB2NdtgKs';
    const range = 'Sheet1!A:G'; // Specify the range to include all columns where you want to append data

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?key=${apiKey}&valueInputOption=RAW`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            values: [[data.partDescription, data.quantity, data.location, data.condition, data.serialNumber, data.compatibilityInfo, data.comments]]
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send data to Google Spreadsheet');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data sent successfully:', data);
        // Optionally, you can show a success message or perform other actions here
    })
    .catch(error => {
        console.error('Error sending data to Google Spreadsheet:', error);
        // Handle the error gracefully, such as displaying an error message to the user
    });
}
