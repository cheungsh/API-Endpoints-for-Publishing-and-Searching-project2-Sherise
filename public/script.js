const today = new Date();
const hourNow = today.getHours();
const minNow = today.getMinutes();
const secNow = today.getSeconds();

/* ---------- User Name ----------*/
const userName = document.getElementById("nameResult");
const infoContainer = document.querySelector(".collectInfoForm");

if (typeof(Storage) !== "undefined") {
  userName.innerHTML = localStorage.getItem("name") || "";
} else {
  userName.innerHTML = "Sorry, your browser does not support local storage.";
}

const checkForm = () => {
  const enteredName = document.getElementById("name").value.trim();
  if (enteredName) {
    userName.innerHTML = enteredName;
    localStorage.setItem("name", enteredName);
    infoContainer.style.display = "none";
  }
};

//Hide form if name already stored
infoContainer.style.display = userName.innerHTML === "" ? "block" : "none";

/* ---------- Greeting ----------*/
const timeOfDay = document.getElementById("timeofday");
let greeting = "Good Morning";
if (hourNow >= 18 || hourNow < 5) greeting = "Good Evening";
else if (hourNow >= 12) greeting = "Good Afternoon";
timeOfDay.innerHTML = greeting;

/* ---------- Mood ----------*/
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
}

const emojis = [
    "emoji/calmEmoji.png",
    "emoji/worriedEmoji.png",
    "emoji/happyEmoji.png",
    "emoji/frustratedEmoji.png",
    "emoji/shockedEmoji.png",
    "emoji/boredEmoji.png",
    "emoji/excitedEmoji.png",
    "emoji/chillEmoji.png",
    "emoji/angryEmoji.png",
    "emoji/sadEmoji.png"
];

const backgroundColors = [
    "rgba(202, 192, 211, 0.6)", 
    "rgba(175, 169, 205, 0.6)",
    "rgba(199, 163, 167, 0.6)",
    "rgba(171, 118, 150, 0.6)",
    "rgba(172, 189, 137, 0.6)",
    "rgba(171, 119, 129, 0.6)",
    "rgba(198, 216, 239, 0.6)",
    "rgba(210, 204, 202, 0.6)",
    "rgba(151, 98, 111, 0.6)",
    "rgba(97, 90, 121, 0.6)"
];

const buttonColors = [
    "rgb(202, 192, 211)", "rgb(175, 169, 205)",  "rgb(199, 163, 167)", "rgb(171, 118, 150)", "rgb(172, 189, 137)", "rgb(171, 119, 129)", "rgb(198, 216, 239)",  "rgb(210, 204, 202)", "rgb(151, 98, 111)", "rgb(97, 90, 121)"
];
const rangeslider = document.getElementById("rangeSlider");
const currentEmoji = document.querySelector(".emoji");
const m1background = document.getElementById("m1");
const moodbutton = document.getElementById("moodButton");
const moodcomment = document.getElementById("moodComment");


const moodLabels = ["calm", "worried", "happy", "frustrated", "shocked", "bored", "excited", "chill", "angry", "sad"];

rangeslider.addEventListener("input", () => {
  const value = parseInt(rangeslider.value);
  currentEmoji.src = emojis[value];
  m1background.style.backgroundColor = backgroundColors[value];
  moodbutton.style.backgroundColor = buttonColors[value];
  moodcomment.innerHTML = moodLabels[value];
});

/* ---------- Mood Chart ----------*/
Chart.defaults.global.legend.position = "bottom";
Chart.defaults.global.defaultFontSize = 16;

const ctx = document.getElementById("moodChart");
const moodTypes = ["Calm", "Worried", "Happy", "Frustrated", "Shocked", "Bored", "Excited", "Chill", "Angry", "Sad"];
const chartData = moodTypes.map(type => parseInt(localStorage.getItem(`${type.toLowerCase()}ChartData`)) || 0);

/* Start of Code https://www.w3schools.com/ai/ai_chartjs.asp */
const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: moodTypes,
    datasets: [{
      label: '# of Emotions',
      data: chartData,
      backgroundColor: buttonColors,
      borderWidth: 3
    }]
  },
  options: {
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 16,
        fontColor: '#000',
        padding: 10,
        boxWidth: 15
      }
    }
  }
});

/* End of Code https://www.w3schools.com/ai/ai_chartjs.asp */

/* ---------- Submit Mood ----------*/
function submitMood() {
  let recordedDayCounter = parseInt(localStorage.getItem("recordedDayCounter")) || 0;
  const selectedMood = moodcomment.innerHTML;
  const name = localStorage.getItem("name") || "Anonymous";
  const today = new Date().toDateString();
  const lastRecorded = localStorage.getItem("lastRecordedDate");
  const counterElement = document.getElementById("recordedDayCounter");

  /* ---------- Recorded Days Counter ----------*/
  if (lastRecorded !== today) {
    recordedDayCounter++;
    localStorage.setItem("recordedDayCounter", recordedDayCounter);
    localStorage.setItem("lastRecordedDate", today);
  }
  counterElement.innerHTML = recordedDayCounter;
  
  // Update chart data
  const moodIndex = moodLabels.indexOf(selectedMood);
  if (moodIndex !== -1) {
    myChart.data.datasets[0].data[moodIndex]++;
    localStorage.setItem(`${selectedMood}ChartData`, myChart.data.datasets[0].data[moodIndex]);
    myChart.update();
  }
}

/* ---------- Triggers ----------*/
document.querySelectorAll('.accordionHeader').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.classList.toggle('active');
    header.classList.toggle('active');
  });
});


const triggers = {
  sleepStart: null,
  sleepEnd: null,
  sleepHours: 0,
  exercise: [],
  hobby: [],
  meal: [],
  social: [],
  weather: [],
  period: false
};

// Sleep input
const sleepStartEl = document.getElementById('sleepStart');
const sleepEndEl = document.getElementById('sleepEnd');
const sleepDateEl = document.getElementById('sleepDateStart');


sleepStartEl.addEventListener('change', () => updateSleep());
sleepEndEl.addEventListener('change', () => updateSleep());
sleepDateEl.addEventListener('change', () => updateSleep());

function updateSleep() {
  const date = sleepDateEl.value;
  const start = sleepStartEl.value;
  const end = sleepEndEl.value;

  if (date && start && end) {
    const startDateTime = new Date(`${date}T${start}:00Z`);
    const endDateTime = new Date(`${date}T${end}:00Z`);

    triggers.sleepStart = startDateTime;
    triggers.sleepEnd = endDateTime;

    // handle overnight sleep
    let diff = (endDateTime - startDateTime) / (1000 * 60 * 60);
    if (diff < 0) diff += 24;
    triggers.sleepHours = diff;
  }
}

// Trigger buttons
document.querySelectorAll('.triggerButton').forEach(btn => {
  btn.addEventListener('click', e => {
    const { type, value } = e.currentTarget.dataset;

    // Toggle the value in the array
    const index = triggers[type].indexOf(value);

    if (index === -1) {
      triggers[type].push(value);
      e.currentTarget.classList.add('active');
    } else {
      triggers[type].splice(index, 1);
      e.currentTarget.classList.remove('active');
    }
  });
});

// Period toggle
const periodToggle = document.getElementById('periodToggle');
if (periodToggle) periodToggle.addEventListener('change', e => triggers.period = e.target.checked);

/* ---------- Gather Data for Backend Send ----------*/
moodbutton.addEventListener('click', async () => {
  const selectedMood = moodcomment.innerText;
  const name = localStorage.getItem('name') || 'Anonymous';

  //Suggestions make edits so it checks mood as well
  let suggestion = 'You are holding up great, I’m sure tomorrow will be even better.';
  if (triggers.sleepHours && triggers.sleepHours < 6)
    suggestion = 'Try to rest more — aim for 8–10 hours of sleep.';
  else if (triggers.exercise)
    suggestion = `Nice work with ${triggers.exercise}! Keep it up!`;
  else if (triggers.social === 'alone')
    suggestion = 'It’s great to have some alone time :)';

  document.getElementById('suggestionText').innerText = suggestion;

  submitMood();

  //Send all to backend
  await sendMoodData({ name, moodValue: selectedMood, ...triggers, suggestions: suggestion });
});

/* ---------- Send Data to Backend ----------*/
async function sendMoodData(data) {
  try {
    const response = await fetch('/mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) console.log('Mood data saved to MongoDB.');
    else console.error('Failed to save mood data.');
  } catch (err) {
    console.error('Error sending mood data:', err);
  }
}