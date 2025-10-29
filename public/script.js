// fetch items from API endpoint and populate the content div
/*
const getData = async () => {
    const response = await fetch('/mood')
    if (response.ok) {
        const data = await response.json()
        document.querySelector('#content').innerHTML = `<h3>✅ MongoDB connected. </h3>`
        console.log(data)
        data.forEach(item => {
            let div = document.createElement('div')
            div.textContent = item.name
            document.querySelector('#content').appendChild(div)
        })
    }
    else {
        document.querySelector('#content').innerHTML = `<div>❌ MongoDB is not connected. Please check your connection string in .env file.</div>`
    }

}

getData()
*/

const today = new Date();
const hourNow = today.getHours();
const minNow = today.getMinutes();
const secNow = today.getSeconds();

/*-------------------Get User Info---------------------*/
let userName = document.getElementById("nameResult");

/* Store info */
if (typeof (Storage) !== "undefined") {
    userName.innerHTML = localStorage.getItem("name");
} else {
    userName.innerHTML = "Sorry your browser does not have storage.";
}

/* checkForm() */
let checkForm = () => {
    let entername = document.getElementById("name").value;
    userName.innerHTML = entername;
    localStorage.setItem("name", entername);

    /* Hide form after name is valid */
    document.querySelector(".collectInfoForm").style.display = "none";
}

/* If name is saved in local storage then no need to display form */
if (userName.innerHTML === ""){
    infoContainer.style.display = "block";
} else {
    infoContainer.style.display = "none";
}

/*-------------------Greeting---------------------*/
let timeOfDay = document.getElementById("timeofday");

if (hourNow >= 18 || hourNow < 5){
    greeting = "Good Evening";
} else if (hourNow >= 12) {
    greeting = "Good Afternoon";
} else {
    greeting = "Good Morning";
}
timeOfDay.innerHTML = greeting;

/*-------------------Mood---------------------*/
/* Check for stored emoji */
/* start of code https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event */
document.addEventListener("DOMContentLoaded", function() {
    activeEmoji();
});
/* start of code https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event */

function openMood(evt, moodName) {
    var i, moodcontent, moodlink;
    moodcontent = document.getElementsByClassName("moodContent");
    
    for (i = 0; i < moodcontent.length; i++) {
        moodcontent[i].style.display = "none";
    }
    moodlink = document.getElementsByClassName("moodLink");
    for (i = 0; i < moodlink.length; i++) {
        moodlink[i].className = moodlink[i].className.replace(" active", "");
    }
    document.getElementById(moodName).style.display = "block";
    evt.currentTarget.className += " active";

    /* Hide navbar */
    document.querySelector(".nav").style.display = "none";
}

/* Mood Slider */
const emojis = ["emoji/worriedEmoji.png", "emoji/happyEmoji.png", "emoji/frustratedEmoji.png", "emoji/shockedEmoji.png", "emoji/boredEmoji.png", "emoji/excitedEmoji.png", "emoji/chillEmoji.png", "emoji/angryEmoji.png", "emoji/sadEmoji.png", "emoji/calmEmoji.png"];
const backgroundColors = [
    "rgb(175, 169, 205, 0.6)",  "rgb(199, 163, 167, 0.6)", "rgb(171, 118, 150, 0.6)", "rgb(172, 189, 137, 0.6)", "rgb(171, 119, 129, 0.6)", "rgb(198, 216, 239, 0.6)",  "rgb(210, 204, 202, 0.6)", "rgb(151, 98, 111, 0.6)", "rgb(97, 90, 121, 0.6)", "rgb(202, 192, 211, 0.6)"
];
const buttonColors = [
    "rgb(175, 169, 205)",  "rgb(199, 163, 167)", "rgb(171, 118, 150)", "rgb(172, 189, 137)", "rgb(171, 119, 129)", "rgb(198, 216, 239)",  "rgb(210, 204, 202)", "rgb(151, 98, 111)", "rgb(97, 90, 121)", "rgb(202, 192, 211)"
];
var rangeslider = document.getElementById("rangeSlider"); 
var currentEmoji = document.querySelector(".emoji");
var m1background = document.getElementById("m1");
var moodbutton = document.getElementById("moodButton");
let moodcomment = document.getElementById("moodComment");

/* start of code https://blog.hubspot.com/website/html-slider*/
rangeslider.addEventListener("input", function(){
    var value = parseInt(rangeSlider.value);
    
    if(value===0){
        currentEmoji.src=emojis[9];
        m1background.style.backgroundColor = backgroundColors[9];
        moodbutton.style.backgroundColor = buttonColors[9];
        moodcomment.innerHTML = "calm";
    }else if (value===1){
        currentEmoji.src=emojis[0];
        m1background.style.backgroundColor = backgroundColors[0];
        moodbutton.style.backgroundColor = buttonColors[0];
        moodcomment.innerHTML = "worried";
    }else if(value===2){
        currentEmoji.src=emojis[1];
        m1background.style.backgroundColor = backgroundColors[1];
        moodbutton.style.backgroundColor = buttonColors[1];
        moodcomment.innerHTML = "happy";
    }else if(value===3){
        currentEmoji.src=emojis[2];
        m1background.style.backgroundColor = backgroundColors[2];
        moodbutton.style.backgroundColor = buttonColors[2];
        moodcomment.innerHTML = "frustrated";
    }else if(value===4){
        currentEmoji.src=emojis[3];
        m1background.style.backgroundColor = backgroundColors[3];
        moodbutton.style.backgroundColor = buttonColors[3];
        moodcomment.innerHTML = "shocked";
    }else if(value===5){
        currentEmoji.src=emojis[4];
        m1background.style.backgroundColor = backgroundColors[4];
        moodbutton.style.backgroundColor = buttonColors[4];
        moodcomment.innerHTML = "bored";
    }else if(value===6){
        currentEmoji.src=emojis[5];
        m1background.style.backgroundColor = backgroundColors[5];
        moodbutton.style.backgroundColor = buttonColors[5];
        moodcomment.innerHTML = "excited";
    }else if(value===7){
        currentEmoji.src=emojis[6];
        m1background.style.backgroundColor = backgroundColors[6];
        moodbutton.style.backgroundColor = buttonColors[6];
        moodcomment.innerHTML = "chill";
    }else if(value===8){
        currentEmoji.src=emojis[7];
        m1background.style.backgroundColor = backgroundColors[7];
        moodbutton.style.backgroundColor = buttonColors[7];
        moodcomment.innerHTML = "angry";
    }else if(value===9){
        currentEmoji.src=emojis[8];
        m1background.style.backgroundColor = backgroundColors[8];
        moodbutton.style.backgroundColor = buttonColors[8];
        moodcomment.innerHTML = "sad";
    }
});
/* end of code https://blog.hubspot.com/website/html-slider*/

/* start of code https://codepen.io/sca-rufus/pen/EvJvMa */
/* Mood Statistics */
Chart.defaults.global.legend.position = "bottom";
Chart.defaults.global.defaultFontSize = 16;
var ctx = document.getElementById("moodChart");

/* Get Stored Data */
let calmChartData = localStorage.getItem("calmChartData") || 0;
let worriedChartData = localStorage.getItem("worriedChartData") || 0;
let happyChartData = localStorage.getItem("happyChartData") || 0;
let frustratedChartData = localStorage.getItem("frustratedChartData") || 0;
let shockedChartData = localStorage.getItem("shockedChartData") || 0;
let boredChartData = localStorage.getItem("boredChartData") || 0;
let excitedChartData = localStorage.getItem("excitedChartData") || 0;
let chillChartData = localStorage.getItem("chillChartData") || 0;
let angryChartData = localStorage.getItem("angryChartData") || 0;
let sadChartData = localStorage.getItem("sadChartData") || 0;

var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Calm", "Worried", "Happy", "Frustrated", "Shocked", "Bored", "Excited", "Chill", "Angry", "Sad"],
        datasets: [{
            /* On hover show amount of emotions */
            label: '# of Emotions',
            data: [calmChartData, worriedChartData, happyChartData, frustratedChartData, shockedChartData, boredChartData, excitedChartData, chillChartData, angryChartData, sadChartData],
            backgroundColor: [
                "rgb(202, 192, 211)",
                "rgb(175, 169, 205)",  
                "rgb(199, 163, 167)", 
                "rgb(171, 118, 150)", 
                "rgb(172, 189, 137)", 
                "rgb(171, 119, 129)", 
                "rgb(198, 216, 239)",  
                "rgb(210, 204, 202)", 
                "rgb(151, 98, 111)", 
                "rgb(97, 90, 121)"
            ],
            borderWidth: 3
        }]
    },
    options: {
      legend: {
            display: false
            },
    		cutoutPercentage: 75,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
    }
});
/* end of code https://codepen.io/sca-rufus/pen/EvJvMa */

/* Record Day Counter */
let recordedDayCounter = parseInt(localStorage.getItem("recordedDayCounter")) || 0;
let counterElement = document.getElementById("recordedDayCounter");
counterElement.innerHTML = recordedDayCounter;

function submitMood() {
    /* Disable button click */
    moodbutton.disabled = true;
    rangeslider.disabled = true;

    /* Store Mood */
    let selectedMood = moodcomment.innerHTML;
    localStorage.setItem("mood", selectedMood);

    /* Updating Days Recorded */
    recordedDayCounter++;
    /* Store Days Recorded*/
    localStorage.setItem("recordedDayCounter", recordedDayCounter);
    counterElement.innerHTML = recordedDayCounter;

    /* start of code https://codepen.io/sca-rufus/pen/EvJvMa */
    /* Updating and Storing Mood Chart Data */
    let chartData = myChart.data.datasets[0].data;
    if (selectedMood === "calm") {
        chartData[0]++;
        localStorage.setItem("calmChartData", chartData[0]);
    } else if (selectedMood === "worried") {
        chartData[1]++;
        localStorage.setItem("worriedChartData", chartData[1]);
    } else if (selectedMood === "happy") {
        chartData[2]++;
        localStorage.setItem("happyChartData", chartData[2]);
    } else if (selectedMood === "frustrated") {
        chartData[3]++;
        localStorage.setItem("frustratedChartData", chartData[3]);
    } else if (selectedMood === "shocked") {
        chartData[4]++;
        localStorage.setItem("shockedChartData", chartData[4]);
    } else if (selectedMood === "bored") {
        chartData[5]++;
        localStorage.setItem("boredChartData", chartData[5]);
    } else if (selectedMood === "excited") {
        chartData[6]++;
        localStorage.setItem("excitedChartData", chartData[6]);
    } else if (selectedMood === "chill") {
        chartData[7]++;
        localStorage.setItem("chillChartData", chartData[7]);
    } else if (selectedMood === "angry") {
        chartData[8]++;
        localStorage.setItem("angryChartData", chartData[8]);
    } else if (selectedMood === "sad") {
        chartData[9]++;
        localStorage.setItem("sadChartData", chartData[9]);
    }
    myChart.update();
    /* end of code https://codepen.io/sca-rufus/pen/EvJvMa */
}

/* Mood data clears at 12:00:00am */
if (hourNow === 0 && minNow === 0 && secNow === 0) {
    let clearTotal = "";
    localStorage.setItem("mood", clearTotal);
}

/* Looks for stored emoji */
function activeEmoji() {
    let storedMood = localStorage.getItem("mood");
    let moodIndex = emojis.indexOf("emoji/" + storedMood + "Emoji.png");
    
    /* start on last selected emotion*/
    if (moodIndex !== -1) {
        currentEmoji.src = emojis[moodIndex];
        m1background.style.backgroundColor = backgroundColors[moodIndex];
        moodbutton.style.backgroundColor = buttonColors[moodIndex];
        moodcomment.innerHTML = storedMood;
    }
}