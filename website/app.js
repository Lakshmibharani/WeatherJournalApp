/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?" ;
let apikey = "9b789cfb2d097c3887b4d68d5c204ca2";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
    const newZipcode = document.getElementById('zip').Value;
    const feel= document.getElementById('feelings').value;
    getWeatherData(baseURL, newZipcode, apikey)
    .then(function(data) {
        postData('http://localhost:3000/projectData' , {
            date : newDate,
            temp : data.main.temp,
            userResponse : feel
        })
        updateUI();
    })
}

const getWeatherData = async (baseURL, newZipcode, apikey) => {
    const response = await fetch(baseURL+newZipcode+apikey)
    try{
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log("error", error);
    };
};
const request = await fetch('/all');
 try {
 const allData = await request.json()
 console.log(allData)
 document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
 document.getElementById('content').innerHTML = allData.feel;
 document.getElementById("date").innerHTML =allData.date;
 }

async function postData(url, data) {
    const reponse = await fetch (url, {
        method : 'POST',
        credentials :'same-origin',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data), 
    });
    return await response.json();
}

const request = await fetch('/all') 
    const request = await fetch(url)
    try {
        const data = response.json();
        console.log(data);
        return data;
    } catch ( error) {
        console.log("error", error);
    
}
