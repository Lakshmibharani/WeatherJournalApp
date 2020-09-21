/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?" ;
let apiKey = "9b789cfb2d097c3887b4d68d5c204ca2";
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
function newData(data) {
    const newtemp = document.getElementById('temp');
    const newdate = document.getElementById('date');
    const newuserResponse = document.getElementsById('userResponse');

    const serverData = getData("http://localhost:3000/projectData");
    console.log("received" + serverData);
    serverData.then(data => {
        newtemp.innerText = data.temp;
        newdate.innerText = data.date;
        newuserResponse.innerText = data.userResponse;
    });
};

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

const getData = async function(url) {
    const response = await fetch(url)
    try {
        const data = response.json();
        console.log(data);
        return data;
    } catch ( error) {
        console.log("error", error);
    }
}
