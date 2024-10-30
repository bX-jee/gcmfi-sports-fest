const SHEET_ID = '1olxsqbAaArHaX9SHln0nu-myWS7USGwBpkOgjH59dN0';
const API_KEY = 'AIzaSyAF3ztc2AotULLhrEiXPmQWLjfeMeVlc9Q';
const RANGE = 'Sheet1!A2:B6'; // Adjust based on your sheet's structure

// Update Date and Time Every Second
function updateDateTime() {
    const now = new Date();
    const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    document.getElementById('current-date-time').innerHTML = `${formattedDate}<br>${formattedTime}`;
}

// Fetch Scores from Google Sheets API
async function fetchScores() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
        const data = await response.json();

        if (data.values) {
            const scores = Object.fromEntries(data.values);
            document.getElementById('pink-score').textContent = scores['Pink'] || '0';
            document.getElementById('red-score').textContent = scores['Red'] || '0';
            document.getElementById('green-score').textContent = scores['Green'] || '0';
            document.getElementById('blue-score').textContent = scores['Blue'] || '0';
            document.getElementById('violet-score').textContent = scores['Violet'] || '0';
        }
    } catch (error) {
        console.error('Error fetching scores:', error);
    }
}

// Initialize and Update Every 30 Seconds
setInterval(fetchScores, 1000);
setInterval(updateDateTime, 1000);

// Initial Load
fetchScores();
updateDateTime();
