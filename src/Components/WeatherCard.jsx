/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDate } from "../utils/useDate";

// icons
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";

import "../index.css";
const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
  const [icon, setIcons] = useState(sun);

  const { time } = useDate;

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcons(cloud);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcons(fog);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcons(rain);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcons(snow);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcons(sun);
      } else if (
        iconString.toLowerCase().includes("storm") ||
        iconString.toLowerCase().includes("thunder")
      ) {
        setIcons(storm);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcons(wind);
      }
    }
  }, [iconString]);
  return (
    <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4">
      <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
        <img src={icon} alt="weather_icon" />
        <p className=" font-bold text-5xl flex justify-center items-center ">
          {temperature} &deg; C
        </p>
      </div>
      <div className="font-bold text-xl  text-center">{place}</div>
      <div className=" w-full flex items-center  justify-between mt-4">
        <p className=" flex-1 text-center p-2">{new Date().toDateString()}</p>
        <p className="flex-1 text-center p-2">{time}</p>
      </div>
      <div className="w-full flex items-center justify-between mt-4 gap-4">
        <p className="flex-1 p-2 text-center font-bold bg-blue-600 shadow rounded-lg">
          Wind Speed <p className=" font-normal">{windspeed}</p>
        </p>
        <p className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
          Humidity <p className=" font-normal">{humidity}</p>
        </p>
      </div>
      <div className="p-3 w-full flex justify-between items-center mt-4">
        <p className="font-semibold text-lg">Heat Index</p>
        <p className="font-normal text-lg">{heatIndex ? heatIndex : "N/A"}</p>
      </div>
      <hr className=" bg-slate-600" />
      <div className=" w-full p-4  flex justify-center items-center text-3xl font-semibold">
        {conditions}
      </div>
    </div>
  );
};

export default WeatherCard;
