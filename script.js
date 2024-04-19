document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inventory-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Log the form data to check if it's captured correctly
        console.log(data);

        // Send data to Google Spreadsheet using Google Sheets API
        sendDataToGoogleSpreadsheet(data);
    });

    function sendDataToGoogleSpreadsheet(data) {
        const spreadsheetId = '1GpQAmUhhRT-5_iA_PeoPaSJqLqNXpa5uPDeDh14U8i4';
        const apiKey = 'AIzaSyAEeFwpce1U2dmlvYTwV4-w7kIB2NdtgKs';
        const jsonPath = 'https://raw.githubusercontent.com/tesecumj90/The-Machinae-Repository/main/client_secret_634651840650-lcu45i4kpbktpfbt78ivejmomf4lmapc.apps.googleusercontent.com.json';
        const range = 'Sheet1!A:G'; // Specify the range to include all columns where you want to append data

        fetch(jsonPath)
            .then(response => response.json())
            .then(credentials => {
                const accessToken = credentials.private_key;
                return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?key=${apiKey}&valueInputOption=RAW`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        values: [[data.partDescription, data.quantity, data.location, data.condition, data.serialNumber, data.compatibilityInfo, data.comments]]
                    })
                });
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
});
