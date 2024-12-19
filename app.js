let temprature = document.querySelector("#temp");
const searchForm = document.querySelector("#searchForm");
let weatherType = document.querySelector("#wType");
let humidity = document.querySelector("#humidityVal");
let windSpeed = document.querySelector("#wind");
let weatherIcon = document.querySelector("#icon");
let cityName = document.querySelector("#cityName");
let laoder = document.querySelector(".loader");
let resultBox = document.querySelector(".results");
let city = searchForm.querySelector("input");

resultBox.style.display = "none";
laoder.style.display = "none";

let getAPI = async (city) => {
  const apiKey = "0e6959b08eddfc25c9c000fb4b574f97";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const apiRes = await fetch(URL);
    // console.log(apiRes);

    if (apiRes.status === 404) {
      throw new Error("City Not Found", { cause: "City Not Found" });
    }

    const apiData = await apiRes.json();
    setTimeout(() => {
      resultBox.style.display = "flex";
      laoder.style.display = "none";
    }, 500);
    // console.log(apiData);
    renderData(
      apiData.main.temp,
      apiData.weather[0].main,
      apiData.weather[0].icon,
      apiData.main.humidity,
      apiData.wind.speed,
      city
    );
  } catch (error) {
    if (error.cause == "City Not Found") {
      laoder.style.display = "none";
      return alert(`${city} Not Found as City`);
    }
    console.error("There was a problem with the fetch operation:", error);
  }
};


let renderData = (temp, wType, icon, humi, wind, city) => {
  temprature.innerText = `${Math.floor(temp)}°C`;
  weatherType.innerText = `${wType}`;
  humidity.innerText = `${humi}%`;
  windSpeed.innerText = `${wind}m/s`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  cityName.innerText = city;
  //   console.log(weatherIcon);
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formCity = city.value;
  if (formCity !== "") {
    getAPI(formCity);
    resultBox.style.display = "none";
    laoder.style.display = "block";
  } else {
    let emptyMsg = document.querySelector(".empty-error");
    emptyMsg.classList.remove("hidden");
    setTimeout(() => {
      emptyMsg.classList.add("hidden");
    }, 800);
    // alert("Enter a city please");
  }
});
