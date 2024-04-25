import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Clouds from "./assets/clouds.svg";
import Sun from "./assets/sun.svg";
import Snow from "./assets/snow.svg";
import Drizzle from "./assets/drizzle.svg";
import Fog from "./assets/fog.svg";
import Tornado from "./assets/tornado.svg";
import Lightning from "./assets/lightning.svg";
import Rain from "./assets/rain.svg"

const api = {
    key: "a6ea16da061ab1b488b952df71ce7dad",
    url: "https://api.openweathermap.org/data/2.5/",
}

function App() {

    const [search, setSearch] = useState("");
    const [data, setData] = useState({});
    const [nextData, setNextData] = useState({});

    const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let month = monthsNames[now.getMonth()];
    let day = daysNames[now.getDay()];
    let date = now.getDate();
    let year = now.getFullYear();
    
    const searchPressed = () => {
        
        fetch(`${api.url}weather?q=${search}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then((result) => {
            setData(result);
        })

        fetch(`${api.url}forecast?q=${search}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then((result) => {
            setNextData(result);
        })
    }

    const enterPressed = (e) => {
        if(e.key === "Enter"){
            searchPressed();
            e.target.value = "";
        }
    }

    function changeDayImage(day) {
        if(nextData.list)
        {
            let weather = nextData.list[day].weather[0].main;

            if(weather === "Clear"){return Sun;}
            else if(weather === "Clouds"){return Clouds;}
            else if(weather === "Thunderstorm"){return Lightning;}
            else if(weather === "Drizzle"){return Drizzle;}
            else if(weather === "Rain"){return Rain;}
            else if(weather === "Snow"){return Snow;}
            else if(weather === "Tornado"){return Tornado;}
            else if(weather === "Fog" || "Mist"){return Fog;}
        }

        else{return Clouds;}
    }

    function currentImage() {
        if(data.weather)
        {
            
            let weather = data.weather[0].main;
            
            if(weather === "Clear"){return Sun;}
            else if(weather === "Clouds"){return Clouds;}
            else if(weather === "Thunderstorm"){return Lightning;}
            else if(weather === "Drizzle"){return Drizzle;}
            else if(weather === "Rain"){return Rain;}
            else if(weather === "Snow"){return Snow;}
            else if(weather === "Tornado"){return Tornado;}
            else if(weather === "Fog" || "Mist"){return Fog;}
        }

        else{return Clouds;}
    }


    return (
        <div className="container-app border border-3 container-fluid d-flex flex-column justify-content-around align-items-center h-100">
            
            <header className="d-flex align-items-center">
                
                <input 
                    className="input city-input py-1 px-2 ms-3" 
                    placeholder="Enter city..."
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={enterPressed}/>

                <button onClick={searchPressed} className="btn btn-primary ms-2">Search</button>

            </header>

            <main className="w-100 h-50 d-flex flex-column align-items-center justify-content-around">
                <div className="text-center">
                    <h1 className="weather-location">{data.name === undefined ? "" : data.name}</h1>
                    <p className="text-secondary">{`${hour}:${minute < 10 ? "0" + minute : minute} ${day}, ${month} ${date}, ${year}`}</p>
                </div>
                
                <div className="container d-flex align-items-center justify-content-around">
                    <img className="weather-img" src={currentImage()} alt="current weather"/>
                    <div className="d-flex flex-column">
                        <div className="d-flex">
                            <h2 className="degrees">{data.main  === undefined ? 0 : parseInt(data.main.temp)}</h2> 
                            <p className="celsius mt-2">°C</p>


                            <div className="max-min ms-2 mt-2 d-flex flex-column">
                                <div className="text-danger">
                                    {data.main  === undefined ? "" : parseInt(data.main.temp_max) + "° max."}
                                </div>

                                <div className="text-primary">
                                    {data.main  === undefined ? "" : parseInt(data.main.temp_min) + "° min."} 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="text-center">
                    <h2>{data.weather === undefined ? "Insert a city" : data.weather[0].main}</h2>
                    <p className="text-secondary">{data.weather === undefined ? "" : data.weather[0].description}</p>
                </div>

                <div className="d-flex text-center container justify-content-around align-items-center">
                    <div>
                        <h6 className="text-primary">Humidity</h6>
                        <p className="weather-info humidity-percent">{data.main === undefined ? "" : data.main.humidity}%</p>
                    </div>

                    <div>
                        <h6 className="text-primary">Wind speed</h6>
                        <p className="weather-info wind-speed">{data.wind === undefined ? 0 : data.wind.speed} km/j</p>
                    </div>
                </div>
            </main>

            <footer className="d-flex align-items-center justify-content-around w-100">
                
                <div className="weather-card text-center d-flex flex-column justify-content-evenly align-items-center">
                    <h6 className="text-primary">Today</h6>
                    <img className="card-img" src={currentImage()} alt="card weather" />
                    <div >
                        Feels like
                        <h6 className="text-black humidity-percent">{data.main === undefined ? "" : parseInt(data.main.feels_like) + "°C"}</h6>
                    </div>
                </div>

                <div className="weather-card text-center d-flex flex-column justify-content-evenly align-items-center">
                    <h6>Tomorrow</h6>
                    <img className="card-img" src={changeDayImage(8)} alt="card weather" />
                    <div>
                        Climate
                        <h6>{nextData.list === undefined ? "" : nextData.list[8].weather[0].main}</h6>
                    </div>
                </div>

                <div className="weather-card text-center d-flex flex-column justify-content-evenly align-items-center">
                    <h6>{`${daysNames[now.getDay()+2]} ${date+2}`}</h6>
                    <img className="card-img" src={changeDayImage(16)} alt="card weather" />
                    <div>
                        Climate
                        <h6>{nextData.list === undefined ? "" : nextData.list[16].weather[0].main}</h6>
                    </div>
                </div>
                
            </footer>

        </div>
    );
}

export default App;
