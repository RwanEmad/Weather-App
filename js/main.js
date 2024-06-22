
// let searchInput = document.getElementById('Search')
// let searchValue = "cairo"

// let findBtn = document.getElementById('findBtn')

const searchBtn = document.getElementById("findBtn");
const searchInput = document.getElementById("Search");

const myModal = new bootstrap.Modal(document.getElementById("myModal"));

searchBtn.addEventListener("click", function () {
    setTimeout(() => {
        search(searchInput.value);
    }, 400);
    console.log(searchInput.value)
});

// Geolocation API integration By Search
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                searchByCoords(latitude, longitude);
            },
            (error) => {
                console.error("Geolocation error:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function searchByCoords(lat, lon) {
    search(`${lat},${lon}`);
}

let dayOne = {
    dayName: "",
    dayAvgTemp: 0,
    dayIcon: 0,
    dayDesc: "",
};
let dayTwo = {
    dayName: "",
    dayAvgTemp: 0,
    dayIcon: 0,
    dayDesc: "",
};
let dayThree = {
    dayName: "",
    dayAvgTemp: 0,
    dayIcon: 0,
    dayDesc: "",
};

async function search(value) {
    try {
        let response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=b28f1d665e08466cb1891917242106&q=${value}&days=3`
        );

        if (!response.ok) {
            throw new Error("Network Response Was Not Ok");
        }

        let data = await response.json();

        dayOne = {
            dayName: dayAndMonth(data.forecast.forecastday[0].date).dayName,
            monthName: dayAndMonth(data.forecast.forecastday[0].date).monthName,
            dayAndMonthName:
                data.forecast.forecastday[0].date.slice(8, 10) +
                " " +
                dayAndMonth(data.forecast.forecastday[0].date).monthName,
            location: data.location.name,
            dayAvgTemp: data.forecast.forecastday[0].day.avgtemp_c,
            dayIcon: data.forecast.forecastday[0].day.condition.icon,
            dayDesc: data.forecast.forecastday[0].day.condition.text,
        };

        dayTwo = {
            dayName: dayAndMonth(data.forecast.forecastday[1].date).dayName,
            dayMaxTemp: data.forecast.forecastday[1].day.maxtemp_c,
            dayMinTemp: data.forecast.forecastday[1].day.mintemp_c,
            dayIcon: data.forecast.forecastday[1].day.condition.icon,
            dayDesc: data.forecast.forecastday[1].day.condition.text,
        };

        dayThree = {
            dayName: dayAndMonth(data.forecast.forecastday[2].date).dayName,
            dayMaxTemp: data.forecast.forecastday[2].day.maxtemp_c,
            dayMinTemp: data.forecast.forecastday[2].day.mintemp_c,
            dayIcon: data.forecast.forecastday[2].day.condition.icon,
            dayDesc: data.forecast.forecastday[2].day.condition.text,
        };

        // Display Data
        displayData(dayOne, dayTwo, dayThree);
    } catch (error) {
        console.error(
            "There Has Been A Problem With Your Fetch Operation: ",
            error
        );

        setTimeout(() => {
            if (searchInput.value !== "") {
                myModal.show();
            }
        }, 2000);
    }
}

function dayAndMonth(dateString) {
    const date = new Date(dateString);

    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const monthName = date.toLocaleDateString("en-US", { month: "long" });

    return { dayName, monthName };
}

function displayData(dayOne, dayTwo, dayThree) {
    updateToday(dayOne);
    updateSecondDay(dayTwo);
    updateThirdDay(dayThree);
}

function updateToday(dayOne) {
    const today = {
        day: document.getElementById("todayDay"),
        date: document.getElementById("todayDate"),
        location: document.getElementById("location"),
        degree: document.getElementById("todayDegreeNum"),
        icon: document.getElementById("todayIcon"),
        desc: document.getElementById("todayStatus"),
    };

    today.day.innerHTML = dayOne.dayName;
    today.date.innerHTML = dayOne.dayAndMonthName;
    today.location.innerHTML = dayOne.location;
    today.degree.innerHTML = dayOne.dayAvgTemp;
    today.icon.setAttribute("src", `https:${dayOne.dayIcon}`);
    today.desc.innerHTML = dayOne.dayDesc;
}

function updateSecondDay(dayTwo) {
    const secondDay = {
        day: document.getElementById("secondDayDay"),
        maxDegree: document.getElementById("secondDayDegreeNum"),
        minDegree: document.getElementById("secondDayDegreeNumMin"),
        icon: document.getElementById("secondDayIcon"),
        desc: document.getElementById("secondDayStatus"),
    };

    secondDay.day.innerHTML = dayTwo.dayName;
    secondDay.maxDegree.innerHTML = dayTwo.dayMaxTemp;
    secondDay.minDegree.innerHTML = dayTwo.dayMinTemp;
    secondDay.icon.setAttribute("src", `https:${dayTwo.dayIcon}`);
    secondDay.desc.innerHTML = dayTwo.dayDesc;
}

function updateThirdDay(dayThree) {
    const thirdDay = {
        day: document.getElementById("thirdDayDay"),
        maxDegree: document.getElementById("thirdDayDegreeNum"),
        minDegree: document.getElementById("thirdDayDegreeNumMin"),
        icon: document.getElementById("thirdDayIcon"),
        desc: document.getElementById("thirdDayStatus"),
    };

    thirdDay.day.innerHTML = dayThree.dayName;
    thirdDay.maxDegree.innerHTML = dayThree.dayMaxTemp;
    thirdDay.minDegree.innerHTML = dayThree.dayMinTemp;
    thirdDay.icon.setAttribute("src", `https:${dayThree.dayIcon}`);
    thirdDay.desc.innerHTML = dayThree.dayDesc;
}

// Call getCurrentLocation on page load to get weather for current location
window.onload = getCurrentLocation;




// getData(searchValue)
// async function getData(location) {
//     let data = await fetch("https://api.weatherapi.com/v1/forecast.json?key=4033ab753ab441168ba145336242206&q=" + location)
//     let result = await data.json();
//     console.log(result);
//     displayWeather(result)
// }

// findBtn.addEventListener('click', function () {

//     searchValue = searchInput.value
//     console.log(searchValue)
//     search(searchValue)

// })

// async function search(location) {
//     let data = await fetch("https://api.weatherapi.com/v1/search.json?key=4033ab753ab441168ba145336242206&q=" + location)
//     let result = await data.json();
//     getData(location)
// }

// function displayWeather(data) {
//     console.log(data.location.name)
//     let cartona = `
//    <div>
//                                 <div class="header w-100 d-flex justify-content-between  px-2">
//                                     <p>tusday</p>
//                                     <p>20June</p>
//                                 </div>
//                                 <div class="forecastContent ">
//                                     <div class="d-flex flex-wrap justify-content-between align-items-center">
//                                         <div>
//                                             <p class="location">${data.location.name}</p>
//                                             <h2 class="temprature d-flex ">${data.current.temp_c}&deg;C
//                                             </h2>
//                                         </div>
//                                         <img class="forecastIcon" src="https:${data.current.condition.icon}" alt="">
//                                     </div>

//                                     <small>${data.current.condition.text}</small>
//                                     <div class="details d-flex justify-content-between">
//                                         <div class="detail">
//                                             <img src="images/icon-umberella.png" alt="">
//                                             <span>20%</span>
//                                         </div>
//                                         <div class="detail">
//                                             <img src="images/icon-wind.png" alt="">
//                                             <span>${data.current.wind_kph} Km/h</span>
//                                         </div>
//                                         <div class="detail">
//                                             <img src="images/icon-compass.png" alt="">
//                                             <span>${data.current.wind_dir}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//     `

//     document.getElementById('CurrentForecast').innerHTML = cartona;


// }